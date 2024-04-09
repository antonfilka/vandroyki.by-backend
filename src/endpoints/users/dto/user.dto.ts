import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserCredentialsDto {
  @IsEmail()
  email: string;
  @IsString()
  username: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  @IsOptional()
  password: string;
}

export class CreateUserGoogleDto {
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  @IsOptional()
  picture?: string;
  @IsString()
  @IsOptional()
  accessToken?: string;
}
