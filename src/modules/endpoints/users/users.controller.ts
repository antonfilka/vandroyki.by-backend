import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';
import { AuthRoles } from 'src/decorators/roles.decorator';
import { AssignRoleDto } from './dto/assign-role.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getMyProfile(@Request() req) {
    return await this.userService.getById(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @Get('/all')
  @AuthRoles('MANAGER', 'ADMIN')
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Post('/role')
  @AuthRoles('ADMIN')
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return await this.userService.assignRole(assignRoleDto);
  }
}
