import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { User } from '@prisma/client';
import { CreateUserGoogleDto } from './dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

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

  async delete() {}
}
