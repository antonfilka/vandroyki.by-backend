import { Controller, Get, UseGuards } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';

@Controller('destinations')
export class DestinationsController {
  constructor(private destinationsService: DestinationsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAllDestinations() {
    const destinations = await this.destinationsService.getAllDestinations();

    return { data: destinations };
  }
}
