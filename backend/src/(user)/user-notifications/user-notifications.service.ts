import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core-services/prisma.service';

@Injectable()
export class UserNotificationsService {
  constructor(private readonly prismaservice: PrismaService) {}

  async getNotifications(userId: string) {
    return this.prismaservice.userNotifications.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        actionType: true,
        isRead: true,
        createdAt: true,
      },
    });
  }
}
