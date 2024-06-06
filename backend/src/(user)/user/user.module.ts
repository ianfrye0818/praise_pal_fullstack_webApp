import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/core-services/prisma.service';
import { EmailService } from 'src/core-services/email.service';
import { JwtStrategy } from 'src/auth/stratagies/jwt-stratagy';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, EmailService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
