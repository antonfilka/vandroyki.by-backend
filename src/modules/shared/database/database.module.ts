import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseService } from './database.service';
import { DatabaseConnectProvider } from './database-connect.providers';
import { PrismaProvider } from './prisma.providers';
import { RepositoryModule } from './repositories/repository.module';

@Module({
  imports: [RepositoryModule, LoggerModule],
  providers: [DatabaseService, DatabaseConnectProvider, PrismaProvider],
  exports: [DatabaseService, RepositoryModule, PrismaProvider],
})
export class DatabaseModule {}
