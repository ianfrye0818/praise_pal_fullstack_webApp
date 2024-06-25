import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDTO } from './dto/createUser.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CompanyGuard } from 'src/core-guards/company.guard';
// import { SuperAdminGuard } from 'src/core-guards/super-admin.guard';
import { AdminGuard } from 'src/core-guards/admin.guard';
import { UpdateUserGuard } from 'src/core-guards/update-user.guard';
import { FilterUserDTO } from './dto/filterUser.dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(SuperAdminGuard)
  // @Get()
  // async findAll(@Query('deletedUsers') deletedUsers: boolean = false) {
  //   return await this.userService.findAll(deletedUsers);
  // }

  @UseGuards(CompanyGuard)
  @Get()
  async findAllUsers(@Query('query') query: FilterUserDTO) {
    return await this.userService.findAllUsers(query);
  }

  // @UseGuards(CompanyGuard)
  // @Get('/company/:companyId')
  // async findAllByCompany(
  //   @Param('companyId') companyId: string,
  //   @Query('deletedUsers') deletedUsers: boolean = false,
  // ) {
  //   return await this.userService.findAllByCompany(companyId, deletedUsers);
  // }

  @UseGuards(CompanyGuard)
  @Get(':id')
  async findOneById(@Param('id') userId: string) {
    return await this.userService.findOneById(userId);
  }

  @UseGuards(UpdateUserGuard)
  @Patch(':id')
  async updateUserById(@Param('id') id: string, @Body() data: updateUserDTO) {
    return await this.userService.updateUserById(id, data);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return await this.userService.softDeleteUserById(id);
  }
}
