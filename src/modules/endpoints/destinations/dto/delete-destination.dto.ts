import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class DeleteDestinationDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
