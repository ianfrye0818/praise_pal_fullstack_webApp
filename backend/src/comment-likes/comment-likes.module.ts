import { Module } from '@nestjs/common';
import { CommentLikesController } from './comment-likes.controller';
import { CommentLikesService } from './comment-likes.service';

@Module({
  controllers: [CommentLikesController],
  providers: [CommentLikesService]
})
export class CommentLikesModule {}
