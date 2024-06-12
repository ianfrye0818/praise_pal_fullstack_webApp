import {
  Controller,
  Request,
  UseGuards,
  Post,
  Body,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/(user)/user/user.service';
import { LocalAuthGuard } from './guards/local.guard';
import { createUserDTO } from 'src/(user)/user/dto/createUser.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    const refreshToken = req.headers.authorization.split(' ')[1];
    return this.authService.refreshToken(req.user, refreshToken);
  }

  @Post('register')
  async registerUser(@Body() data: createUserDTO) {
    const newUser = await this.userService.create(data);

    return await this.authService.login(newUser);
  }

  @Post('logout')
  async logout(@Request() req) {
    const refreshToken = req.headers.authorization.split(' ')[1];
    return this.authService.logout(refreshToken);
  }
}
