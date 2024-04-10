import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EndpointsModule } from './modules/endpoints/endpoints.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { SharedModule } from './modules/shared/shared.module';
import { LoggerMiddleware } from './modules/shared/logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    SharedModule,
    EndpointsModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
