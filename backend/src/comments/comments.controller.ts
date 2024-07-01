import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CompanyGuard } from '../core-guards/company.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/createComment.dto';

@UseGuards(CompanyGuard)
@UseGuards(JwtGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @SkipThrottle()
  @Get()
  async findCommentsByKudoId(
    @Query('kudosId') kudosId: string,
    @Query('companyId') companyId: string,
  ) {
    return this.commentsService.findAllComments({ kudosId });
  }

  @SkipThrottle()
  @Get(':commentId')
  async findCommentById(@Param('commentId') commentId: string) {
    return this.commentsService.findCommentById(commentId);
  }

  @Post()
  async createComment(@Body() comment: CreateCommentDTO) {
    return this.commentsService.createComment(comment);
  }

  @Patch(':commentId')
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() comment: CreateCommentDTO,
  ) {
    return this.commentsService.updateCommentById(commentId, comment);
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentsService.softDeleteCommentById(commentId);
  }
}
