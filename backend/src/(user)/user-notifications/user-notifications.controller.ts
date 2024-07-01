import {
  // Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserNotificationsService } from './user-notifications.service';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { UserNotificationsGuard } from './guards/user-notification.guard';
import { FilterUserNotificationsDTO } from './dto/filterUserNotifications.dto';
// @UseGuards(UserNotificationsGuard)
@UseGuards(JwtGuard)
@Controller('user-notifications')
export class UserNotificationsController {
  constructor(
    private readonly userNotificationService: UserNotificationsService,
  ) {}

  @Get()
  async getUserNotifications(
    @Query() query: FilterUserNotificationsDTO,
    @Req() req: any,
  ) {
    console.log(['data'], { query, reqQuery: req.query, user: req.user });
    return await this.userNotificationService.getNotifications(
      req.user.userId,
      query,
    );
  }

  // @Post()
  // async createNotification(
  //   @Body() notificationData: CreateUserNotificationDTO,
  // ) {
  //   return await this.userNotificationService.createNotification(
  //     notificationData,
  //   );
  // }

  @Patch(':id')
  async markNotificationAsRead(@Req() req: any) {
    return await this.userNotificationService.markNotificationAsRead(
      req.params.id,
    );
  }

  @Delete(':id')
  async deleteNotificaiton(@Param('id') id: string) {
    return await this.userNotificationService.softDeleteNotification(id);
  }
}
