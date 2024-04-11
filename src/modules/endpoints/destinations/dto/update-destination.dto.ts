import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';
import { DestinationStatus } from '@prisma/client';

export class UpdateDestinationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(DestinationStatus)
  status?: DestinationStatus;
}
