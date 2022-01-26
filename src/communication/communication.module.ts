import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { LoggerMiddleware } from '../middleware/logger.middleware';

@Module({
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('communication');
  }
}
