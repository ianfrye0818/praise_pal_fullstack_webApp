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

  async logout(token: string) {
    return this.refreshTokenService.deleteToken(token);
  }

  async login(user: User) {
    const payload = this.generatePayload(user);

    const refreshToken = await this.generateRefreshToken(payload);
    await this.refreshTokenService.updateUserRefreshToken({
      newToken: refreshToken,
      userId: user.id,
    });

    const accessToken = this.generateAccessToken(payload);

    return {
      ...payload,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(user: JWTUser, oldToken: string) {
    try {
      await this.refreshTokenService.getRefreshToken(oldToken);

      // if (!dbRefreshToken)
      //   throw new UnauthorizedException('Invalid refresh token');

      const cachedToken = this.refreshTokenService.getCachedToken(oldToken);
      if (cachedToken) {
        const accessToken = this.generateAccessToken(user);
        return {
          accessToken,
          refreshToken: cachedToken,
        };
      }

      const newRefreshToken = await this.generateRefreshToken(user);
      const newAccessToken = this.generateAccessToken(user);

      await this.refreshTokenService.updateUserRefreshToken({
        userId: user.userId,
        newToken: newRefreshToken,
        oldToken,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  private generatePayload(user: User | JWTUser) {
    return {
      email: user.email,
      userId: 'userId' in user ? user.userId : user.id, // Normalizing user ID
      companyId: user.companyId,
      role: user.role,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  private generateAccessToken(payload: object) {
    return this.jwtService.sign(payload, {
      expiresIn: '2m',
      secret: process.env.JWT_SECRET,
    });
  }

  private async generateRefreshToken(payload: object) {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
