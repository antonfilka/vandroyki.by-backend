import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PROVIDERS } from 'src/constants/providers';
import { PrismaInstance } from 'src/modules/shared/database/prisma.providers';
import { CreateDestinationDto } from './dto/create-destination.dto';
import {
  Destination,
  DestinationStatus,
  Prisma,
  UserRole,
} from '@prisma/client';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { GetDestinationsDto } from './dto/GetDestinationsDto';

@Injectable()
export class DestinationsService {
  constructor(@Inject(PROVIDERS.PRISMA) private prisma: PrismaInstance) {}

  destinationsInclude: Prisma.DestinationInclude = {
    favoritedBy: true,
    visitedBy: true,
    comments: true,
    city: true,
    tripDestination: true,
    creator: true,
  };

  async getAllDestinations(query: GetDestinationsDto): Promise<Destination[]> {
    const { status, city } = query;

    const where: Prisma.DestinationWhereInput = {};

    if (status) where.status = status;
    if (city) where.city = { name: city };

    return await this.prisma.destination.findMany({
      where,
      include: this.destinationsInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPublishedDestinations(
    query: GetDestinationsDto,
  ): Promise<Destination[]> {
    const { city, order } = query;

    const where: Prisma.DestinationWhereInput = { status: 'PUBLISHED' };
    let orderBy: Prisma.DestinationOrderByWithRelationInput = {
      favoritedBy: { _count: 'desc' },
    };

    if (city) where.city = { name: city };
    if (order === 'DATE_DESC') orderBy = { createdAt: 'desc' };
    if (order === 'DATE_ASC') orderBy = { createdAt: 'asc' };

    return await this.prisma.destination.findMany({
      where,
      include: this.destinationsInclude,
      orderBy,
    });
  }
  async getMyFavorites(userId: string): Promise<Destination[]> {
    return await this.prisma.destination.findMany({
      where: { status: 'PUBLISHED', favoritedBy: { some: { id: userId } } },
      include: this.destinationsInclude,
      orderBy: { favoritedBy: { _count: 'desc' } },
    });
  }

  async getMyVisited(userId: string): Promise<Destination[]> {
    return await this.prisma.destination.findMany({
      where: { status: 'PUBLISHED', visitedBy: { some: { id: userId } } },
      include: this.destinationsInclude,
      orderBy: { favoritedBy: { _count: 'desc' } },
    });
  }

  async create(
    createDestinationDto: CreateDestinationDto,
    userRole: UserRole,
    userId: string,
  ) {
    const status: DestinationStatus =
      userRole === UserRole.MANAGER ? 'ARCHIVED' : 'SUGGESTED';

    const { cityId, ...dtoData } = createDestinationDto;

    const data: Prisma.DestinationCreateInput = {
      ...dtoData,
      status,
      creator: { connect: { id: userId } },
    };
    if (cityId) data.city = { connect: { id: cityId } };

    return await this.prisma.destination.create({ data });
  }

  async delete(ids: string[]) {
    return await this.prisma.destination.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async update(id: string, updateDestinationDto: UpdateDestinationDto) {
    return await this.prisma.destination.update({
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

    return await this.prisma.user.update({
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

  async addToVisited(userId: string, destinationId: string) {
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
        visitedDestinations: {
          some: { id: destinationId },
        },
      },
    });

    if (userWithDestination) {
      throw new Error('Destination is already in visited');
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        visitedDestinations: {
          connect: { id: destinationId },
        },
      },
    });
  }

  async removeFromVisited(
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
      throw new Error('Destination is already removed from visited');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        visitedDestinations: {
          disconnect: { id: destinationId },
        },
      },
    });
  }
}
