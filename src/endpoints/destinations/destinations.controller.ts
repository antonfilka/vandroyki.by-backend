import { Controller, Get } from '@nestjs/common';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private destinationsService: DestinationsService) {}

  @Get()
  async getAllDestinations() {
    const destinations = await this.destinationsService.getAllDestinations();

    return { data: destinations };
  }
}
