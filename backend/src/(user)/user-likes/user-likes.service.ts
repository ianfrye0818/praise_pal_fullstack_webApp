import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/core-services/prisma.service';
import { KudosService } from 'src/kudos/kudos.service';

@Injectable()
export class UserLikesService {
  constructor(
    private prismaService: PrismaService,
    private KudosService: KudosService,
  ) {}

  async createLike({ userId, kudosId }: { userId: string; kudosId: string }) {
    try {
      await this.prismaService.user_Like.create({
        data: {
          kudosId,
          userId,
        },
      });

      await this.KudosService.increaseLikes(kudosId);
    } catch (error) {
      console.error(error);
      if (error.code === 'P2002') {
        throw new HttpException('You already liked this kudos', 400);
      }
      throw new InternalServerErrorException('Could not create like');
    }
  }

  async deleteLike({ kudosId, userId }: { kudosId: string; userId: string }) {
    try {
      await this.prismaService.user_Like.delete({
        where: {
          userId_kudosId: {
            kudosId,
            userId,
          },
        },
      });

      await this.KudosService.decreaseLikes(kudosId);
    } catch (error) {
      console.error(error);
      if (error.code === 'P2002')
        throw new HttpException('You already unliked this kudos', 400);
      throw new InternalServerErrorException('Could not delete like');
    }
  }
}
