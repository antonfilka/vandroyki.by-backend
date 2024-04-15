import { IsString } from 'class-validator';

export class DeleteFileDto {
  @IsString()
  link: string;
}
