import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class createKudosDTO {
  @IsString()
  senderId: string;

  @IsString()
  recipientId: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  title: string;
}

export class UpdateKudosDTO extends PartialType(createKudosDTO) {
  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @IsOptional()
  @IsInt()
  likes?: number;
}
