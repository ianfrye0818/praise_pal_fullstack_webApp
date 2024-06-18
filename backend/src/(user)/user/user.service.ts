import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/core-services/prisma.service';
import { createUserDTO, updateUserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { Cron } from '@nestjs/schedule';
import { User } from '@prisma/client';
import { EmailService } from 'src/core-services/email.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private emailService: EmailService,
  ) {}

  async findAll(deletedUsers?: boolean): Promise<Omit<User, 'password'>[]> {
    try {
      const users = await this.prismaService.user.findMany({
        where: deletedUsers ? undefined : { deletedAt: null },
      });
      return users.map(({ password, ...rest }) => rest);
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong', 500);
    }
  }

  async findAllByCompany(
    companyId: string,
    deletedUsers?: boolean,
  ): Promise<Omit<User, 'password'>[]> {
    try {
      const users = await this.prismaService.user.findMany({
        where: { companyId, ...(deletedUsers ? {} : { deletedAt: null }) },
      });
      return users.map(({ password, ...rest }) => rest);
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong', 500);
    }
  }

  async findOneById(userId: string): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new NotFoundException('User not found');
      const { password, ...rest } = user;
      return rest;
    } catch (error) {
      console.error(error);
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      )
        throw error;
      throw new HttpException('Something went wrong', 500);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({ where: { email } });
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong', 500);
    }
  }

  async create(data: createUserDTO): Promise<User> {
    const { companyCode, password, ...userData } = data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const company = await this.prismaService.company.findUnique({
      where: { companyCode },
    });
    if (!company) throw new NotFoundException('Company not found');
    const newUser = await this.prismaService.user.create({
      data: { ...userData, companyId: company.id, password: hashedPassword },
    });
    return newUser;
  }
  catch(error) {
    console.error(error);
    if (error instanceof NotFoundException) throw error;
    if (error.code === 'P2002') {
      throw new HttpException('Email already exists', 400);
    }
    throw new HttpException('Something went wrong', 500);
  }

  async updateUserById(
    id: string,
    data: updateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id,
        },
      });
      if (!user) throw new NotFoundException('User not found');

      if (data.password) data.password = await bcrypt.hash(data.password, 10);

      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data,
      });
      const { password, ...rest } = updatedUser;
      return rest;
    } catch (error) {
      console.error(error);
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      )
        throw error;
      throw new HttpException('Something went wrong', 500);
    }
  }

  async softDeleteUserById(id: string): Promise<Omit<User, 'password'>> {
    return this.updateUserById(id, { deletedAt: new Date() });
  }

  @Cron('0 0 * * *') // Run every night at midnight
  async permanentlyDeleteOldUsers() {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - 30);

    try {
      await this.prismaService.user.deleteMany({
        where: {
          deletedAt: {
            lte: dateThreshold,
          },
        },
      });
    } catch (error) {
      console.error(error);
      this.emailService.sendCronErrorNotification(
        error.message,
        'Delete Users',
      );
    }
  }
}
