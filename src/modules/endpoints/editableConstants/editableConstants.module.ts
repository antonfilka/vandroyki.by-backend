import { Module } from '@nestjs/common';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from 'src/modules/shared/shared.module';
import { EditableConstantsController } from './editableConstants.controller';
import { EditableConstantsService } from './editableConstants.service';

@Module({
  imports: [SharedModule],
  controllers: [EditableConstantsController],
  providers: [EditableConstantsService, JwtService, JwtGuard],
})
export class EditableConstantsModule {}
