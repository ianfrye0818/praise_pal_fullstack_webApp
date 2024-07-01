import { Module } from '@nestjs/common';
import { KudosController } from './kudos.controller';
import { KudosService } from './kudos.service';
import { EmailService } from '../core-services/email.service';
import { PrismaService } from '../core-services/prisma.service';
import { JwtStrategy } from '../auth/stratagies/jwt-stratagy';
import { UserService } from '../(user)/user/user.service';
import { UserNotificationsService } from '../(user)/user-notifications/user-notifications.service';

@Module({
  controllers: [KudosController],
  providers: [
    KudosService,
    EmailService,
    PrismaService,
    JwtStrategy,
    UserService,
    UserNotificationsService,
  ],
  exports: [KudosService],
})
export class KudosModule {}
