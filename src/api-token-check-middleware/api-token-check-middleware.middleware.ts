import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ApiTokenCheckMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(req.headers['api-token'] !== 'my-token'){
      throw new BadRequestException("The token noes not match");
    }
    next();
  }
}
