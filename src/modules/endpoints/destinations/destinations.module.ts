import { Module } from '@nestjs/common';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [DestinationsController],
  providers: [DestinationsService, JwtService, JwtGuard],
})
export class DestinationsModule {}
