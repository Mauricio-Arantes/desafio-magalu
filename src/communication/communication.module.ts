import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';

@Module({
  controllers: [CommunicationController],
  providers: [CommunicationService, PrismaService],
})
export class CommunicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('communication');
  }
}
