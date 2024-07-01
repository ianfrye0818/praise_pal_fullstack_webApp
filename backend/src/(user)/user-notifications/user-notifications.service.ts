import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core-services/prisma.service';
import { CreateUserNotificationDTO } from './dto/createUserNotification.dto';
import { Cron } from '@nestjs/schedule';
import { EmailService } from 'src/core-services/email.service';
import { FilterUserNotificationsDTO } from './dto/filterUserNotifications.dto';

@Injectable()
export class UserNotificationsService {
  constructor(
    private readonly prismaservice: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async getNotifications(userId: string, filter: FilterUserNotificationsDTO) {
    console.log({ notificationFilter: filter });

    const { limit, offset, sort, actionTypes, ...otherFilters } = filter;

    return this.prismaservice.userNotifications.findMany({
      where: {
        userId,
        deletedAt: filter.deletedAt || null,
        actionType: { in: actionTypes },
        ...otherFilters,
      },
      orderBy: { createdAt: sort || 'desc' },
      take: limit,
      skip: offset,
      select: {
        id: true,
        userId: true,
        actionType: true,
        isRead: true,
        createdAt: true,
      },
    });
  }

  async getNotificationById(id: string) {
    return this.prismaservice.userNotifications.findUnique({
      where: {
        id,
      },
    });
  }

  async createNotification(notificaitonData: CreateUserNotificationDTO) {
    return this.prismaservice.userNotifications.create({
      data: notificaitonData,
    });
  }

  async markNotificationAsRead(id: string) {
    return this.prismaservice.userNotifications.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }

  async softDeleteNotification(id: string) {
    return this.prismaservice.userNotifications.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  @Cron('0 0 * * *') // Run every night at midnight
  async permDeleteOldNotificaitons() {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - 30);

    try {
      await this.prismaservice.userNotifications.deleteMany({
        where: {
          OR: [
            {
              AND: [
                {
                  isRead: true,
                },
                {
                  updatedAt: {
                    lt: dateThreshold,
                  },
                },
              ],
            },
            {
              deletedAt: {
                lt: dateThreshold,
              },
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
      this.emailService.sendCronErrorNotification(
        'User Notification deletion failed' + error.message,
        'Delete User Notifications',
      );
    }
  }
}
