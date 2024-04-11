import { Module } from '@nestjs/common';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from 'src/modules/shared/shared.module';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [SharedModule],
  controllers: [TripsController],
  providers: [TripsService, JwtService, JwtGuard],
})
export class TripsModule {}
