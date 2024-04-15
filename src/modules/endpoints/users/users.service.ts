import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/constants/providers';
import { PrismaInstance } from 'src/modules/shared/database/prisma.providers';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(@Inject(PROVIDERS.PRISMA) private prisma: PrismaInstance) {}

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const { cityId, ...dtoData } = updateProfileDto;
    const data: Prisma.UserUpdateInput = dtoData;

    if (cityId) data.city = { connect: { id: cityId } };

    return await this.prisma.user.update({ where: { id: userId }, data });
  }

  async getByIdSafe(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        picture: true,
        location: true,
        restPictures: true,
        role: true,
        bio: true,
        language: true,
        city: true,
        matchedUsers: true,
        interests: true,
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

  // async create(dto: CreateUserCredentialsDto) {
  //   const emailUser = await this.prisma.user.findUnique({
  //     where: {
  //       email: dto.email,
  //     },
  //   });
  //   if (emailUser) throw new ConflictException('Email duplicated');

  //   const usernameUser = await this.prisma.user.findUnique({
  //     where: {
  //       username: dto.username,
  //     },
  //   });
  //   if (usernameUser) throw new ConflictException('Username duplicated');

  //   const newUser = await this.prisma.user.create({
  //     data: {
  //       ...dto,
  //       password: await hash(dto.password, 10),
  //     },
  //   });

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { password, ...result } = newUser;
  //   return result;
  // }
}
