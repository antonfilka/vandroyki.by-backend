import { Module } from '@nestjs/common';
import { JwtGuard } from 'src/modules/shared/auth/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from 'src/modules/shared/shared.module';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

@Module({
  imports: [SharedModule],
  controllers: [S3Controller],
  providers: [S3Service, JwtService, JwtGuard],
})
export class S3Module {}
