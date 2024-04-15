import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthRoles } from 'src/decorators/roles.decorator';
import { EditableConstantsService } from './editableConstants.service';
import { DeleteEditableConstantsDto } from './dto/delete-editable-constants.dto';
import { AddEditableConstantsDto } from './dto/add-editable-constants.dto';

@Controller('editable-constants')
export class EditableConstantsController {
  constructor(private editableConstantsService: EditableConstantsService) {}

  @Get('/cities')
  async getCities() {
    const data = await this.editableConstantsService.getCities();
    return { data };
  }

  @Post('/cities')
  @AuthRoles('MANAGER', 'ADMIN')
  async addCities(@Body() addEditableConstantsDto: AddEditableConstantsDto) {
    return await this.editableConstantsService.addCities(
      addEditableConstantsDto.names,
    );
  }

  @Post('/cities/delete')
  @AuthRoles('MANAGER', 'ADMIN')
  async deleteCities(
    @Body() deleteEditableConstantsDto: DeleteEditableConstantsDto,
  ) {
    return await this.editableConstantsService.deleteCities(
      deleteEditableConstantsDto.ids,
    );
  }

  @Get('/interests')
  async getInterests() {
    const data = await this.editableConstantsService.getInterests();
    return { data };
  }

  @Post('/interests')
  @AuthRoles('MANAGER', 'ADMIN')
  async addInterests(@Body() addEditableConstantsDto: AddEditableConstantsDto) {
    return await this.editableConstantsService.addInterests(
      addEditableConstantsDto.names,
    );
  }

  @Post('/interests/delete')
  @AuthRoles('MANAGER', 'ADMIN')
  async deleteInterests(
    @Body() deleteEditableConstantsDto: DeleteEditableConstantsDto,
  ) {
    return await this.editableConstantsService.deleteInterests(
      deleteEditableConstantsDto.ids,
    );
  }
}
