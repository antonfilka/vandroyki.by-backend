import { Module } from '@nestjs/common';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from 'src/modules/shared/shared.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [SharedModule],
  controllers: [CommentsController],
  providers: [CommentsService, JwtService, JwtGuard],
})
export class CommentsModule {}
