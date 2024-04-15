import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class GoogleLoginDto {
  @IsString()
  googleAccessToken: string;
}

export class TelegramLoginDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsString()
  authDate: string;

  @IsString()
  hash: string;
}
