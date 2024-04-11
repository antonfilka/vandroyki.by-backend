import { Module } from '@nestjs/common';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from 'src/modules/shared/shared.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [SharedModule],
  controllers: [EventsController],
  providers: [EventsService, JwtService, JwtGuard],
})
export class EventsModule {}
