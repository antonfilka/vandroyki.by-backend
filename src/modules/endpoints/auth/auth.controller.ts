import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RefreshJwtGuard } from 'src/modules/shared/auth/refresh.guard';
import { AuthService } from './auth.service';
import { GoogleLoginDto, TelegramLoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Post('telegram-login')
  async telegramAuth(@Body() body: TelegramLoginDto) {
    return await this.authService.telegramLogin(body);
  }

  @Post('google-login')
  async googleLogin(@Body() dto: GoogleLoginDto) {
    return await this.authService.googleLogin(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Req() req, @Res() res: Response) {
  //   const tokens = await this.authService.authGoogleUser(req.user);
  //   res.redirect(
  //     `${process.env.FRONTEND_URL}/google-auth?accessToken=${tokens.backendTokens.accessToken}&refreshToken=${tokens.backendTokens.refreshToken}`,
  //   );
  // }

  // @Post('register')
  // async registerUser(@Body() dto: CreateUserCredentialsDto) {
  //   return await this.authService.register(dto);
  // }

  // @Post('login')
  // async login(@Body() dto: LoginDto) {
  //   return await this.authService.login(dto);
  // }
}
