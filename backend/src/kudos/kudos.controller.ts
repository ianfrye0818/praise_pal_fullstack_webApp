import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { KudosService } from './kudos.service';
import { CompanyGuard } from '../core-guards/company.guard';
import { createKudosDTO, UpdateKudosDTO } from './dto/createKudos.dto';
import { KudosFilterDTO } from './dto/kudosFilter.dto';
import { EditKudosGuard } from '../core-guards/update-kudos.guard';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@UseGuards(JwtGuard)
@Controller('kudos')
export class KudosController {
  constructor(private readonly kudosService: KudosService) {}

  // @UseGuards(SuperAdminGuard)
  @UseGuards(CompanyGuard)
  @Get()
  async findAll(@Query() query: KudosFilterDTO) {
    return await this.kudosService.getAllKudos(query);
  }

  @UseGuards(CompanyGuard)
  @Get(':kudoId')
  async findKudoById(@Param('kudoId') kudoId: string) {
    return await this.kudosService.getKudoById(kudoId);
  }

  @UseGuards(CompanyGuard)
  @Post()
  async createKudo(@Body() data: createKudosDTO) {
    return await this.kudosService.createKudo(data);
  }

  @UseGuards(EditKudosGuard)
  @Patch(':kudosId')
  async updateKudo(
    @Param('kudosId') kudosId: string,
    @Body() data: UpdateKudosDTO,
  ) {
    return await this.kudosService.updateKudoById(kudosId, data);
  }

  @UseGuards(EditKudosGuard)
  @Delete(':kudosId')
  async deleteKudo(@Param('kudosId') kudosId: string) {
    return await this.kudosService.softDeleteKudoById(kudosId);
  }
}
