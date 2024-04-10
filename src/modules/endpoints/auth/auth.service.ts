import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleLoginDto, LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { google } from 'googleapis';
import { UsersService } from '../users/users.service';
import { GoogleUser } from './dto/googleUserResponse';
import { CreateUserCredentialsDto } from '../users/dto/user.dto';
import { UserRepository } from 'src/modules/shared/database/repositories/user.repository';

export const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      email: user.email,
      role: user.role,
      id: user.id,
      sub: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async googleLogin(dto: GoogleLoginDto) {
    const { googleAccessToken } = dto;
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: googleAccessToken });
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    const userInfo = await oauth2.userinfo.get();

    const userWithTokens = await this.authGoogleUser({
      email: userInfo.data.email,
      firstName: userInfo.data.given_name,
      lastName: userInfo.data.family_name,
      picture: userInfo.data.picture,
      accessToken: googleAccessToken,
    });

    return userWithTokens;
  }

  async authGoogleUser(user: GoogleUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, ...userData } =
      await this.userRepository.upsertGoogleUser({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        accessToken: user.accessToken,
      });

    const payload = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      sub: {
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    };

    return {
      user: userData,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async register(dto: CreateUserCredentialsDto) {
    await this.usersService.create(dto);
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userRepository.getByEmailOrUsername(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      role: user.role,
      id: user.id,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '10s',
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
    };
  }
}
