import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/(user)/user/user.service';
import { JWTUser, Role } from 'src/types';

@Injectable()
export class UpdateUserGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtUser = request.user as JWTUser;
    const data = request.body;

    //super admin can update any user
    if (jwtUser.role === Role.SUPER_ADMIN) return true;

    const companyId = request.params.companyId;
    const userId = request.params.id;

    //user cannot update their own role(including admin)
    if (jwtUser.userId === userId && data.role)
      throw new ForbiddenException('You cannot update your role');

    //admin can update any user in their company
    if (jwtUser.role === Role.ADMIN && jwtUser.companyId === companyId)
      return true;

    //user can update their own data except role
    if (jwtUser.userId === userId) return true;

    throw new ForbiddenException('You are not allowed to update this user');
  }
}
