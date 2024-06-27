import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { capitalizeWords } from '../../utils';

export class CreateCompanyDTO {
  @IsString()
  @Transform(({ value }) => capitalizeWords(value as string))
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => capitalizeWords(value as string))
  address: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => capitalizeWords(value as string))
  city: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @Transform(({ value }) => value.toUpperCase())
  state: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  zip: string;

  @IsOptional()
  @IsString()
  phone: string;
}

export class UpdateCompanyDTO extends PartialType(CreateCompanyDTO) {
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
