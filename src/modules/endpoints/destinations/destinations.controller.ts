import {
  Body,
  Controller,
  Delete,
  Patch,
  Get,
  Param,
  Post,
  Req,
  Query,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { AuthRoles } from 'src/decorators/roles.decorator';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { DeleteDestinationDto } from './dto/delete-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { GetDestinationsDto } from './dto/GetDestinationsDto';

@Controller('destinations')
export class DestinationsController {
  constructor(private destinationsService: DestinationsService) {}

  @Get()
  async getPublishedDestinations() {
    const destinations =
      await this.destinationsService.getPublishedDestinations();

    return { data: destinations };
  }

  @Get('/all')
  @AuthRoles('MANAGER', 'ADMIN')
  async getAllDestinations(@Query() query: GetDestinationsDto) {
    const destinations =
      await this.destinationsService.getAllDestinations(query);

    return { data: destinations };
  }

  @Get('/favorites')
  @AuthRoles('MANAGER', 'ADMIN', 'USER')
  async getMyFavorites(@Req() req: any) {
    const destinations = await this.destinationsService.getMyFavorites(
      req.user.id,
    );

    return { data: destinations };
  }

  @Post()
  @AuthRoles('MANAGER', 'USER', 'ADMIN')
  create(@Body() createDestinationDto: CreateDestinationDto, @Req() req: any) {
    return this.destinationsService.create(
      createDestinationDto,
      req.user.role,
      req.user.id,
    );
  }

  @Delete()
  @AuthRoles('MANAGER', 'ADMIN')
  delete(@Body() deleteDestinationDto: DeleteDestinationDto) {
    return this.destinationsService.delete(deleteDestinationDto.ids);
  }

  @Patch(':id')
  @AuthRoles('MANAGER', 'ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationsService.update(id, updateDestinationDto);
  }

  @Post(':id/favorite')
  @AuthRoles('MANAGER', 'USER', 'ADMIN')
  addToFavorites(@Param('id') id: string, @Req() req: any) {
    return this.destinationsService.addToFavorites(req.user.id, id);
  }

  @Delete(':id/favorite')
  @AuthRoles('MANAGER', 'USER', 'ADMIN')
  async removeFromFavorites(@Param('id') id: string, @Req() req: any) {
    return this.destinationsService.removeFromFavorites(req.user.id, id);
  }
}
