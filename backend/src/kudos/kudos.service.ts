import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core-services/prisma.service';
import { createKudosDTO, UpdateKudosDTO } from './dto/createKudos.dto';
import { Cron } from '@nestjs/schedule';
import { EmailService } from 'src/core-services/email.service';
import { Kudos } from '@prisma/client';

@Injectable()
export class KudosService {
  private readonly selectProps = {
    select: {
      userId: true,
      displayName: true,
      firstName: true,
      lastName: true,
      email: true,
      companyId: true,
      role: true,
    },
  };
  private readonly commentSelectProps = {
    select: {
      id: true,
      content: true,
      // kudosId: true,
      // parentId: true,
      // userId: true,
    },
  };

  private readonly userLikeSelectProps = {
    select: {
      userId: true,
      kudosId: true,
    },
  };

  private readonly kudosSelectOptions = {
    include: {
      sender: this.selectProps,
      receiver: this.selectProps,
      comments: this.commentSelectProps,
      userLikes: this.userLikeSelectProps,
    },
  };

  constructor(
    private readonly prismaService: PrismaService,
    private emailService: EmailService,
  ) {}

  async getAllKudos(filter?: Partial<Kudos>): Promise<Kudos[]> {
    try {
      return await this.prismaService.kudos.findMany({
        where: filter,
        orderBy: { id: 'desc' },
        ...this.kudosSelectOptions,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not retreive Kudos');
    }
  }

  async getKudosByCompanyId(companyId: string): Promise<Kudos[]> {
    try {
      return await this.getAllKudos({ companyId });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not retreive Kudos');
    }
  }

  async getKudosBySenderId(senderId: string): Promise<Kudos[]> {
    try {
      return await this.getAllKudos({ senderId });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not retreive Kudos');
    }
  }

  async getKudosByreceiverId(receiverId: string): Promise<Kudos[]> {
    try {
      return this.getAllKudos({ receiverId });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not retreive Kudos');
    }
  }

  async getKudoById(id: string): Promise<Kudos> {
    try {
      const kudo = await this.prismaService.kudos.findUnique({
        where: { id },
        ...this.kudosSelectOptions,
      });

      if (!kudo) throw new NotFoundException('Unable to locate Kudo ' + id);
      return kudo;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Could not retreive Kudo');
    }
  }

  async createKudo(data: createKudosDTO): Promise<Kudos> {
    try {
      const newKudos = await this.prismaService.kudos.create({
        data: {
          ...data,
        },
      });
      return newKudos;
    } catch (error) {
      console.error(error);
      if (error.code === 'P2002') {
        throw new HttpException('Email already exists', 400);
      }
      throw new InternalServerErrorException(
        'Something went wrong creating Kudo',
      );
    }
  }

  async updateKudoById(id: string, data: UpdateKudosDTO): Promise<Kudos> {
    try {
      const kudo = await this.prismaService.kudos.update({
        data,
        where: { id },
      });
      if (!kudo)
        throw new NotFoundException('Could not find kudo with id of ' + id);
      return kudo;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new HttpException('Something went wrong updating Kudo', 500);
    }
  }

  async increaseLikes(id: string): Promise<Kudos> {
    try {
      const kudo = await this.getKudoById(id);
      return await this.updateKudoById(id, { likes: kudo.likes + 1 });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not like Kudo');
    }
  }

  async decreaseLikes(id: string): Promise<Kudos> {
    try {
      const kudo = await this.getKudoById(id);
      return await this.updateKudoById(id, { likes: kudo.likes - 1 });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not unlike Kudo');
    }
  }

  async softDeleteKudoById(id: string): Promise<Kudos> {
    try {
      const kudo = await this.updateKudoById(id, { deletedAt: new Date() });
      if (!kudo)
        throw new NotFoundException('Could not find kudo with id ' + id);
      return kudo;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Something went wrong deleting Kudo',
      );
    }
  }

  @Cron('0 0 * * *') // Run every night at midnight
  async permanentlyDeleteOldUsers() {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - 30);

    try {
      await this.prismaService.kudos.deleteMany({
        where: {
          deletedAt: {
            lte: dateThreshold,
          },
        },
      });
    } catch (error) {
      console.error(error);
      this.emailService.sendCronErrorNotification(
        'Kudos cleanup failed' + error.message,
        'Delete Kudos',
      );
    }
  }
}
