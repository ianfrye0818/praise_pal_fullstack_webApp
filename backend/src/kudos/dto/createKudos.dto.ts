import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class createKudosDTO {
  @IsString()
  senderId: string;

  @IsOptional()
  @ValidateIf((o) => o.receiverId !== null && o.receiverId !== undefined)
  @IsString()
  receiverId?: string;

  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsBoolean()
  isAnonymous: boolean;
}

export class UpdateKudosDTO extends PartialType(createKudosDTO) {
  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @IsOptional()
  @IsInt()
  likes?: number;
}
