import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DestinationsModule } from './destinations/destinations.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DestinationsModule, PrismaModule, AuthModule, UsersModule],
  providers: [PrismaService],
})
export class EndpointsModule {}
