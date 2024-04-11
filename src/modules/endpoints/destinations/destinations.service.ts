import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PROVIDERS } from 'src/constants/providers';
import { PrismaInstance } from 'src/modules/shared/database/prisma.providers';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { Destination, UserRole } from '@prisma/client';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { GetDestinationsDto } from './dto/GetDestinationsDto';

@Injectable()
export class DestinationsService {
  constructor(@Inject(PROVIDERS.PRISMA) private prisma: PrismaInstance) {}

  async getAllDestinations(query: GetDestinationsDto): Promise<Destination[]> {
    const { status } = query;
    const where = status ? { status } : {};
    return this.prisma.destination.findMany({ where });
  }

  async getPublishedDestinations(): Promise<Destination[]> {
    return this.prisma.destination.findMany({
      where: { status: 'PUBLISHED' },
      include: { favoritedBy: true },
    });
  }
  async getMyFavorites(userId: string): Promise<Destination[]> {
    return this.prisma.destination.findMany({
      where: { status: 'PUBLISHED', favoritedBy: { some: { id: userId } } },
      include: { favoritedBy: true },
    });
  }

  async create(
    createDestinationDto: CreateDestinationDto,
    userRole: UserRole,
    userId: string,
  ) {
    const status = userRole === UserRole.MANAGER ? 'ARCHIVED' : 'SUGGESTED';

    return this.prisma.destination.create({
      data: {
        ...createDestinationDto,
        status,
        creatorId: userId,
      },
    });
  }

  async delete(ids: string[]) {
    return this.prisma.destination.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async update(id: string, updateDestinationDto: UpdateDestinationDto) {
    return this.prisma.destination.update({
      where: { id },
      data: updateDestinationDto,
    });
  }

  async addToFavorites(userId: string, destinationId: string) {
    const destination = await this.prisma.destination.findUnique({
      where: { id: destinationId },
    });
    if (!destination) {
      throw new NotFoundException(
        `Destination with ID ${destinationId} not found`,
      );
    }

    const userWithDestination = await this.prisma.user.findFirst({
      where: {
        id: userId,
        favoriteDestinations: {
          some: { id: destinationId },
        },
      },
    });

    if (userWithDestination) {
      throw new Error('Destination is already in favorites');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        favoriteDestinations: {
          connect: { id: destinationId },
        },
      },
    });
  }

  async removeFromFavorites(
    userId: string,
    destinationId: string,
  ): Promise<void> {
    const destination = await this.prisma.destination.findUnique({
      where: { id: destinationId },
    });
    if (!destination) {
      throw new NotFoundException(
        `Destination with ID ${destinationId} not found`,
      );
    }

    const userWithDestination = await this.prisma.user.findFirst({
      where: {
        id: userId,
        favoriteDestinations: {
          some: { id: destinationId },
        },
      },
    });

    if (!userWithDestination) {
      throw new Error('Destination is already removed from favorites');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        favoriteDestinations: {
          disconnect: { id: destinationId },
        },
      },
    });
  }
}
