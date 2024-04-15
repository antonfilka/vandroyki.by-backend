import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/constants/providers';
import { PrismaInstance } from 'src/modules/shared/database/prisma.providers';

@Injectable()
export class EditableConstantsService {
  constructor(@Inject(PROVIDERS.PRISMA) private prisma: PrismaInstance) {}

  async getCities() {
    return await this.prisma.city.findMany();
  }

  async getInterests() {
    return await this.prisma.interest.findMany();
  }

  async addCities(names: string[]) {
    return await this.prisma.city.createMany({
      data: names.map((name) => ({ name })),
    });
  }

  async addInterests(names: string[]) {
    return await this.prisma.interest.createMany({
      data: names.map((name) => ({ name })),
    });
  }
  async deleteCities(ids: string[]) {
    return await this.prisma.city.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async deleteInterests(ids: string[]) {
    return await this.prisma.interest.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
