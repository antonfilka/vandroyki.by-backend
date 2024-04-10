import { Request, Response } from 'express';
import * as uuid from 'uuid';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';
import { Logger } from '../../../interfaces';

/**
 * Middleware responsible for adding logger to res.locals to be used
 * in controllers, services, etc.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger: Logger;

  constructor(private loggerService: LoggerService) {
    this.logger = loggerService.getLogger();
  }

  use(req: Request, res: Response, next: () => void) {
    const traceId = uuid.v4();
    res.locals.traceId = traceId;
    res.locals.logger = this.logger.child({ traceId });
    next();
  }
}
