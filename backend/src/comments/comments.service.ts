import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ActionType, Comment } from '@prisma/client';
import { PrismaService } from '../core-services/prisma.service';
import { ClientComment } from '../types';
import { CreateCommentDTO, UpdateCommentDTO } from './dto/createComment.dto';
import { Cron } from '@nestjs/schedule';
import { EmailService } from '../core-services/email.service';
import { UserNotificationsService } from 'src/(user)/user-notifications/user-notifications.service';

@Injectable()
export class CommentsService {
  private readonly userSelectProps = {
    select: {
      userId: true,
      displayName: true,
      firstName: true,
      lastName: true,
      email: true,
      companyId: true,
      role: true,
      createdAt: true,
    },
  };
  private readonly commentSelectProps = {
    select: {
      id: true,
      content: true,
      kudosId: true,
      parentId: true,
      kudos: true,
      user: this.userSelectProps,
    },
  };
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
    private readonly userNotificationsService: UserNotificationsService,
  ) {}

  async findAllComments(filter?: Partial<Comment>): Promise<ClientComment[]> {
    try {
      const comments = await this.prismaService.comment.findMany({
        where: filter,
        orderBy: { id: 'desc' },
        ...this.commentSelectProps,
      });
      if (!comments) throw new NotFoundException('No comments found');
      return comments;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not retreive Kudos');
    }
  }

  async findCommentById(commentId: string): Promise<ClientComment> {
    try {
      const comment = await this.prismaService.comment.findUnique({
        where: { id: commentId },
        ...this.commentSelectProps,
      });
      if (!comment) throw new NotFoundException('Comment not found');
      return comment;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not retreive Kudos');
    }
  }

  async createKudoComment(payload: CreateCommentDTO): Promise<ClientComment> {
    try {
      const newComment = await this.prismaService.comment.create({
        data: payload,
        ...this.commentSelectProps,
      });

      if (newComment) {
        const senderId = newComment.kudos.senderId;
        const receiverId = newComment.kudos.receiverId;
        const commenterId = payload.userId;

        if (commenterId === receiverId && commenterId !== senderId) {
          await this.userNotificationsService.createNotification({
            actionType: ActionType.COMMENT,
            referenceId: newComment.id,
            userId: senderId,
          });
        }

        if (commenterId === senderId && commenterId !== receiverId) {
          await this.userNotificationsService.createNotification({
            actionType: ActionType.COMMENT,
            referenceId: newComment.id,
            userId: receiverId,
          });
        }

        if (commenterId !== senderId && commenterId !== receiverId) {
          await Promise.all([
            this.userNotificationsService.createNotification({
              actionType: ActionType.COMMENT,
              referenceId: newComment.id,
              userId: senderId,
            }),
            this.userNotificationsService.createNotification({
              actionType: ActionType.COMMENT,
              referenceId: newComment.id,
              userId: receiverId,
            }),
          ]);
        }
      }

      return newComment;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not create comment');
    }
  }

  async createChildComment(payload: CreateCommentDTO): Promise<ClientComment> {
    try {
      const newComment = await this.prismaService.comment.create({
        data: payload,
        ...this.commentSelectProps,
      });

      if (newComment) {
        const parentId = newComment.parentId;
        const commenterId = payload.userId;

        if (parentId !== commenterId) {
          await this.userNotificationsService.createNotification({
            actionType: ActionType.COMMENT,
            referenceId: newComment.id,
            userId: parentId,
          });
        }
      }

      return newComment;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not create comment');
    }
  }

  async updateCommentById(
    commentId: string,
    comment: UpdateCommentDTO,
  ): Promise<ClientComment> {
    try {
      const updatedComment = await this.prismaService.comment.update({
        where: { id: commentId },
        data: comment,
        ...this.commentSelectProps,
      });
      return updatedComment;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not update comment');
    }
  }

  async softDeleteCommentById(commentId: string): Promise<ClientComment> {
    try {
      const deletedComment = await this.updateCommentById(commentId, {});
      return deletedComment;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not delete comment');
    }
  }

  @Cron('0 0 * * *') // Run every night at midnight
  async permanentlyDeleteOldComments() {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - 30);

    try {
      await this.prismaService.user.deleteMany({
        where: {
          deletedAt: {
            lte: dateThreshold,
          },
        },
      });
    } catch (error) {
      console.error(error);
      this.emailService.sendCronErrorNotification(
        error.message,
        'Delete Comments',
      );
    }
  }
}
