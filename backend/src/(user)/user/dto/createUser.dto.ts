import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, IsDate, IsEnum } from 'class-validator';
import { Role } from 'src/types';

export class createUserDTO {
  @IsString()
  displayName: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  companyCode: string;
}

export class updateUserDTO extends PartialType(createUserDTO) {
  @IsOptional()
  @IsEnum(['ADMIN', 'USER'], { message: 'Role must be either Admin or User' })
  role?: Role;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
