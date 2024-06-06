import {
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserLikesService } from './user-likes.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JWTUser } from 'src/types';

@UseGuards(JwtGuard)
@Controller('likes')
export class UserLikesController {
  constructor(private userLikesService: UserLikesService) {}

  @Post(':id')
  async updateLike(@Param('id') kudosId: string, @Request() req: any) {
    return await this.userLikesService.createLike({
      kudosId,
      userId: (req.user as JWTUser).userId,
    });
  }

  @Delete(':id')
  async deleteLike(@Param('id') kudosId: string, @Request() req: any) {
    return await this.userLikesService.deleteLike({
      kudosId,
      userId: (req.user as JWTUser).userId,
    });
  }
}
