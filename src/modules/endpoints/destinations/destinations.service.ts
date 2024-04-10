import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/constants/providers';
import { PrismaInstance } from 'src/modules/shared/database/prisma.providers';

@Injectable()
export class DestinationsService {
  constructor(@Inject(PROVIDERS.PRISMA) private prisma: PrismaInstance) {}

  async getAllDestinations() {
    return await this.prisma.destination.findMany();
  }
}
