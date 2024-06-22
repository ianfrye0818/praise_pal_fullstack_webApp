import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './env';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: env.CLIENT_URL,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Set-Cookie',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(env.PORT);
}
bootstrap();
