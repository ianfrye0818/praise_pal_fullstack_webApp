import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core-services/prisma.service';
import { UserModule } from './(user)/user/user.module';
import { CompanyModule } from './company/company.module';
import { KudosModule } from './kudos/kudos.module';

import { UserSettingsModule } from './(user)/user-settings/user-settings.module';
import { AuthModule } from './auth/auth.module';
import { UserLikesModule } from './(user)/user-likes/user-likes.module';
import { UserNotificationsModule } from './(user)/user-notifications/user-notifications.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserModule,
    CompanyModule,
    KudosModule,
    UserLikesModule,
    UserSettingsModule,
    AuthModule,
    UserNotificationsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
