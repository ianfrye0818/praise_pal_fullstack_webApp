import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from '../core-services/prisma.service';
import { JwtStrategy } from '../auth/stratagies/jwt-stratagy';
import { UserService } from '../(user)/user/user.service';
import { EmailService } from '../core-services/email.service';
import { UserNotificationsService } from 'src/(user)/user-notifications/user-notifications.service';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    PrismaService,
    JwtStrategy,
    UserService,
    EmailService,
    UserNotificationsService,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
