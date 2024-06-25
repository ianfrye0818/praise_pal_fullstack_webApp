import { Controller, UseGuards } from '@nestjs/common';
import { UserNotificationsService } from './user-notifications.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Controller('user-notifications')
export class UserNotificationsController {
  constructor(
    private readonly userNotificationService: UserNotificationsService,
  ) {}
}
