import { ConflictException, Injectable } from '@nestjs/common';
import { GoogleUser } from 'src/endpoints/auth/dto/googleUserResponse';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/endpoints/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserCredentialsDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async authGoogleUser(user: GoogleUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, ...userData } =
      await this.usersRepository.upsertGoogleUser({
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
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
    };
  }

  async create(dto: CreateUserCredentialsDto) {
    const emailUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (emailUser) throw new ConflictException('Email duplicated');

    const usernameUser = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (usernameUser) throw new ConflictException('Username duplicated');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }

  async getByEmailOrUsername(emailUsername: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailUsername }, { username: emailUsername }],
      },
    });
  }

  async getById(id: number) {
    console.log(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
