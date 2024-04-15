import { DestinationStatus } from '@prisma/client';
import { IsOptional, IsEnum, IsString } from 'class-validator';

export class GetDestinationsDto {
  @IsOptional()
  @IsEnum(DestinationStatus)
  status?: DestinationStatus;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  order?: 'RATING' | 'DATE_DESC' | 'DATE_ASC';
}
