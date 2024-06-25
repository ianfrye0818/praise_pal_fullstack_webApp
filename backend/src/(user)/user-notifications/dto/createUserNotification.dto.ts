import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateUserNotificationDTO {
  @IsString()
  userId: string;

  @IsString()
  message: string;
}

export class UpdateUserNotificationDTO {
  @IsBoolean()
  read: boolean;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
