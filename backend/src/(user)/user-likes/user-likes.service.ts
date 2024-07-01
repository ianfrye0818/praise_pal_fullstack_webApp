import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../core-services/prisma.service';
import { KudosService } from '../../kudos/kudos.service';
import { UserNotificationsService } from '../user-notifications/user-notifications.service';

@Injectable()
export class UserLikesService {
  constructor(
    private prismaService: PrismaService,
    private kudosService: KudosService,
    private userNotificationsService: UserNotificationsService,
  ) {}

  async createLike({ userId, kudosId }: { userId: string; kudosId: string }) {
    try {
      await this.prismaService.user_Like.create({
        data: {
          kudosId,
          userId,
        },
      });

      const updateKudo = await this.kudosService.increaseLikes(kudosId);
      console.log({ updateKudo, kudosId, userId });

      if (updateKudo.senderId !== userId) {
        await this.userNotificationsService.createNotification({
          userId: updateKudo.senderId,
          referenceId: kudosId,
          actionType: 'LIKE',
        });
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'P2002') {
        throw new HttpException('You already liked this kudos', 400);
      }
      throw new InternalServerErrorException('Could not create like');
    }
  }

  async deleteLike({ kudosId, userId }: { kudosId: string; userId: string }) {
    try {
      await this.prismaService.user_Like.delete({
        where: {
          userId_kudosId: {
            kudosId,
            userId,
          },
        },
      });

      const updateKudos = await this.kudosService.decreaseLikes(kudosId);

      if (updateKudos.senderId !== userId) {
        await this.userNotificationsService.hardDeleteNotification({
          referenceId: kudosId,
          userId: updateKudos.senderId,
        });
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'P2025')
        throw new HttpException('You already unliked this kudos', 400);
      throw new InternalServerErrorException('Could not delete like');
    }
  }
}
