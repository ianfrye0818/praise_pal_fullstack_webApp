import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class KudosFilterDTO {
  @IsOptional()
  @IsUUID()
  receiverId?: string;

  @IsOptional()
  @IsUUID()
  senderId?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsUUID()
  companyId?: string;

  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
