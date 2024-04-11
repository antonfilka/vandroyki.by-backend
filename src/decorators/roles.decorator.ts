import { UseGuards, SetMetadata, applyDecorators } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';
import { RolesGuard } from 'src/modules/shared/auth/roles.guard';
export const ROLES_KEY = 'roles';

export function AuthRoles(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtGuard, RolesGuard),
  );
}
