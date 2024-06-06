import { Module } from '@nestjs/common';
import { UserLikesController } from './user-likes.controller';
import { UserLikesService } from './user-likes.service';
import { KudosService } from 'src/kudos/kudos.service';
import { PrismaService } from 'src/core-services/prisma.service';
import { EmailService } from 'src/core-services/email.service';
import { UserService } from '../user/user.service';
import { SkipThrottle } from '@nestjs/throttler';
@SkipThrottle()
@Module({
  controllers: [UserLikesController],
  providers: [
    UserLikesService,
    KudosService,
    PrismaService,
    EmailService,
    UserService,
  ],
  exports: [UserLikesService],
})
export class UserLikesModule {}
