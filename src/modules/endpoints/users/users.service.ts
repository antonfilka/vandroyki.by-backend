import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserCredentialsDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { PROVIDERS } from 'src/constants/providers';
import { PrismaInstance } from 'src/modules/shared/database/prisma.providers';
import { AssignRoleDto } from './dto/assign-role.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(PROVIDERS.PRISMA) private prisma: PrismaInstance) {}

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

  async getById(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async assignRole(body: AssignRoleDto) {
    await this.prisma.user.update({
      where: { id: body.userId },
      data: { role: body.newRole },
    });
  }
}
