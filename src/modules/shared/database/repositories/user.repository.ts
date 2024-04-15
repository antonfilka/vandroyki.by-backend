import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../../../constants/providers';
import { PrismaInstance } from '../prisma.providers';
import { User } from '@prisma/client';
import { TelegramLoginDto } from 'src/modules/endpoints/auth/dto/auth.dto';
import { CreateUserGoogleDto } from 'src/modules/endpoints/users/dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject(PROVIDERS.PRISMA) private prisma: PrismaInstance) {}

  async upsertGoogleUser(userData: CreateUserGoogleDto): Promise<User> {
    return this.prisma.user.upsert({
      where: {
        email: userData.email,
      },
      update: {
        ...userData,
      },
      create: {
        ...userData,
      },
    });
  }

  async upsertTelegramUser(userData: TelegramLoginDto): Promise<User> {
    return await this.prisma.user.upsert({
      where: {
        id: userData.id,
      },
      update: {
        ...userData,
      },
      create: {
        ...userData,
      },
    });
  }

  async getByEmailOrUsername(emailUsername: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username: emailUsername }],
      },
    });
  }

  async getById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
