import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core-services/prisma.service';

@Injectable()
export class UserNotificationsService {
  constructor(private readonly prismaservice: PrismaService) {}

  async getNotifications(userId: string) {
    return this.prismaservice.userNotification.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        read: true,
        message: true,
      },
    });
  }
}
