import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateDestinationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsString()
  location: string;
}
