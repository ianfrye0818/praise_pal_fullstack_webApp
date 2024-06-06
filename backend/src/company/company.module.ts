import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaService } from 'src/core-services/prisma.service';
import { EmailService } from 'src/core-services/email.service';
import { UserService } from 'src/(user)/user/user.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, EmailService, UserService],
  exports: [CompanyService],
})
export class CompanyModule {}
