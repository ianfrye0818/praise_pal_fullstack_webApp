import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserService } from 'src/(user)/user/user.service';
import { ClientUser } from 'src/types';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as ClientUser;
    const companyId = request.params.companyId;
    if (user.role === Role.SUPER_ADMIN) return true;
    if (user.companyId === companyId) return true;

    return false;
  }
}
