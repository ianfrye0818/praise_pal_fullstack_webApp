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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { KudosService } from './kudos.service';
import { CompanyGuard } from 'src/core-guards/company.guard';
import { createKudosDTO, UpdateKudosDTO } from './dto/createKudos.dto';
import { KudosFilterDTO } from './dto/kudosFilter.dto';
import { EditKudosGuard } from 'src/core-guards/update-kudos.guard';
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

  // @UseGuards(CompanyGuard)
  // @Get()
  // async findAllByCompanyId(@Param('companyId') companyId: string) {
  //   return await this.kudosService.getKudosByCompanyId(companyId);
  // }

  // @UseGuards(CompanyGuard)
  // @Get(':companyId/sender/:senderId')
  // async findAllBySenderId(@Param('senderId') senderId: string) {
  //   return await this.kudosService.getKudosBySenderId(senderId);
  // }

  // @UseGuards(CompanyGuard)
  // @Get(':companyId/recipient/:receiverId')
  // async findAllByreceiverId(@Param('receiverId') receiverId: string) {
  //   return await this.kudosService.getKudosByreceiverId(receiverId);
  // }

  @UseGuards(CompanyGuard)
  @Get(':kudoId')
  async findKudoById(@Param('kudoId') kudoId: string) {
    return await this.kudosService.getKudoById(kudoId);
  }

  @UseGuards(CompanyGuard)
  @Post()
  async createKudo(
    @Param('companyId') comapnyId: string,
    @Body() data: createKudosDTO,
  ) {
    return await this.kudosService.createKudo(data, comapnyId);
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
