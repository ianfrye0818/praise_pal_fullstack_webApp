/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const currentTime = new Date().toLocaleTimeString();
    const route = context.switchToHttp().getRequest().url;
    const user = context.switchToHttp().getRequest().user;
    if (!user) return next.handle();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `${currentTime} Route ${route}, User: ${user.email}, Request Time: ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
