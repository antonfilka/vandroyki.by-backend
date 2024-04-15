import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Body,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';
import { AuthRoles } from 'src/decorators/roles.decorator';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getMyProfile(@Request() req) {
    const userData = await this.userService.getByIdSafe(req.user.id);
    return { data: userData };
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.getByIdSafe(id);
  }

  @Get('/all')
  @AuthRoles('MANAGER', 'ADMIN')
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Patch()
  @AuthRoles('ADMIN')
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.userService.updateProfile(req.user.id, updateProfileDto);
  }

  @Patch('/role')
  @AuthRoles('ADMIN')
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return await this.userService.assignRole(assignRoleDto);
  }
}
