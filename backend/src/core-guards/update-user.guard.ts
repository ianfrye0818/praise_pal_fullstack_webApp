import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserService } from '../(user)/user/user.service';
import { ClientUser } from '../types';

@Injectable()
export class UpdateUserGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtUser = request.user as ClientUser;
    const data = request.body;

    if (jwtUser.role === Role.SUPER_ADMIN) return true;

    const companyId = request.params.companyId || request.query.companyId;
    const userId = request.params.id || request.query.userId;
    console.log({ jwtUser, data, companyId, userId });

    //TODO: check to see if this logic is valid
    if (jwtUser.userId === userId && data.role && data.role !== jwtUser.role)
      throw new ForbiddenException('You cannot update your role');

    if (jwtUser.role === Role.ADMIN && jwtUser.companyId === companyId)
      return true;

    if (jwtUser.userId === userId) return true;

    throw new ForbiddenException('You are not allowed to update this user');
  }
}
