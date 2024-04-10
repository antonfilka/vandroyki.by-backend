import { Module } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { LoggerModule } from '../../logger/logger.module';
import { PrismaProvider } from '../prisma.providers';
import { UserRepository } from './user.repository';

@Module({
  imports: [LoggerModule],
  providers: [UserRepository, DatabaseService, PrismaProvider],
  exports: [UserRepository],
})
export class RepositoryModule {}
