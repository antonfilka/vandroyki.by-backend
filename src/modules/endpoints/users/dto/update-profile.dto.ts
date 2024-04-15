import { LanguageCode } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsEnum(LanguageCode)
  language?: LanguageCode;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  restPictures?: string[];
}
