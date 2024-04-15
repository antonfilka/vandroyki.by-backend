import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class DeleteEditableConstantsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
