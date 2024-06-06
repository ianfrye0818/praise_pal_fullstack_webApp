import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/(user)/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JWTUser } from 'src/types';
import { RefreshTokenService } from 'src/core-services/refreshToken.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    console.log({ loginUser: user });
    const payload = {
      email: user.email,
      userId: user.id,
      companyId: user.companyId,
      role: user.role,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    await this.refreshTokenService.updateUserRefreshToken({
      newToken: refreshToken,
      userId: user.id,
    });

    return {
      id: user.id,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET,
      }),
      refreshToken,
    };
  }

  async refreshToken(user: JWTUser, oldToken: string) {
    try {
      const dbRefreshToken =
        await this.refreshTokenService.getRefreshToken(oldToken);
      if (!dbRefreshToken)
        throw new UnauthorizedException('Invalid refresh token');
      const payload = {
        email: user.email,
        userId: user.userId,
        companyId: user.companyId,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET,
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET,
      });

      await this.refreshTokenService.updateUserRefreshToken({
        userId: user.userId,
        newToken: refreshToken,
        oldToken,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
