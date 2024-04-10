import { DestinationsModule } from './destinations/destinations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UsersModule, DestinationsModule],
})
export class EndpointsModule {}
