import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiTokenCheckMiddlewareMiddleware } from './api-token-check-middleware/api-token-check-middleware.middleware';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://root:example@127.0.0.1:27017/nest?authSource=admin')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiTokenCheckMiddlewareMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
