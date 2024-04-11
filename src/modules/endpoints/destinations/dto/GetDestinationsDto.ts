import { DestinationStatus } from '@prisma/client';
import { IsOptional, IsEnum } from 'class-validator';

export class GetDestinationsDto {
  @IsOptional()
  @IsEnum(DestinationStatus)
  status?: DestinationStatus;
}
