import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class FilterUserNotificationsDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsBoolean()
  read?: boolean;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsDate()
  createdAt?: string;

  @IsOptional()
  @IsDate()
  updatedAt?: string;

  @IsOptional()
  @IsDate()
  deletedAt?: string;
}
