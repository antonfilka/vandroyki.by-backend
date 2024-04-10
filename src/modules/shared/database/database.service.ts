import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../logger/logger.service';
import { Logger } from '../../../interfaces';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private prisma: PrismaClient;
  private logger: Logger;

  constructor(private loggerService: LoggerService) {
    this.prisma = new PrismaClient();
    this.logger = loggerService.getLogger();
  }

  async onApplicationShutdown() {
    await this.disconnect();
  }

  getPrisma() {
    return this.prisma;
  }

  async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  async disconnect(): Promise<void> {
    try {
      await Promise.all([this.prisma.$disconnect()]);
    } catch (error) {
      this.logger.error('Error disconnecting database', error);
      await this.prisma.$disconnect();
      process.exit(1);
    }
  }
}
