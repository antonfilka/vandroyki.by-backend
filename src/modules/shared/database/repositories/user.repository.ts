import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../../../constants/providers';
import { PrismaInstance } from '../prisma.providers';
import { CreateUserGoogleDto } from 'src/modules/endpoints/users/dto/user.dto';
import { User } from '@prisma/client';

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

  async getByEmailOrUsername(emailUsername: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailUsername }, { username: emailUsername }],
      },
    });
  }

  async getById(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
