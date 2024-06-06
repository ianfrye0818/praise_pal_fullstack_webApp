import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(private prismaService: PrismaService) {}

  async getRefreshToken(token: string) {
    const refreshTokenRecord = await this.prismaService.refreshToken.findFirst({
      where: {
        token,
      },
    });
    if (refreshTokenRecord) return refreshTokenRecord;
    return null;
  }

  async updateUserRefreshToken({
    userId,
    newToken,
    oldToken,
  }: {
    userId: string;
    newToken: string;
    oldToken?: string;
  }) {
    try {
      await this.prismaService.refreshToken.create({
        data: {
          userId,
          token: newToken,
        },
      });

      if (oldToken) {
        await this.prismaService.refreshToken.deleteMany({
          where: { token: oldToken },
        });
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong', 500);
    }
  }
}
