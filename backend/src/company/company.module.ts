import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaService } from '../core-services/prisma.service';
import { EmailService } from '../core-services/email.service';
import { UserService } from '../(user)/user/user.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, EmailService, UserService],
  exports: [CompanyService],
})
export class CompanyModule {}
