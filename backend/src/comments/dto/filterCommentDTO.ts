import { IsDate, IsOptional, IsString } from 'class-validator';

export class FilterCommentDTO {
  @IsOptional()
  @IsString()
  commentId?: string;

  @IsOptional()
  @IsString()
  kudosId?: string;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

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
