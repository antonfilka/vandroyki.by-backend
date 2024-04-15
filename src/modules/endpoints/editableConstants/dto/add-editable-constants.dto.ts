import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class AddEditableConstantsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  names: string[];
}
