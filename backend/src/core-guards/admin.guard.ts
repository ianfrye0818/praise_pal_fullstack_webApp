import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ClientUser } from 'src/types';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as ClientUser;
    if (user.role === Role.SUPER_ADMIN) return true;
    const companyId = request.params.companyId;
    if (user.role === Role.ADMIN && user.companyId === companyId) return true;

    return false;
  }
}
