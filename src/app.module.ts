import { Module } from '@nestjs/common';
import { EndpointsModule } from './endpoints/endpoints.module';
import { UsersModule } from './endpoints/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EndpointsModule, UsersModule],
  providers: [],
})
export class AppModule {}
