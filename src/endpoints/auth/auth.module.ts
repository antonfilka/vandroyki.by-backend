import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/endpoints/auth/google.strategy';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    UsersModule,
  ],
  providers: [
    UsersService,
    UsersRepository,
    PrismaService,
    GoogleStrategy,
    JwtService,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
