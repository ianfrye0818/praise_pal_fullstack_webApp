import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/(user)/user/user.service';
import { LocalStrategy } from './stratagies/local-stratagy';
import { JwtStrategy } from './stratagies/jwt-stratagy';
import { PrismaService } from 'src/core-services/prisma.service';
import { EmailService } from 'src/core-services/email.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RefreshStrategy } from './stratagies/refresh-stratagy';
import { RefreshTokenService } from 'src/core-services/refreshToken.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    PrismaService,
    EmailService,
    RefreshTokenService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
