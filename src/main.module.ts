import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { CommunicationModule } from './communication/communication.module';

@Module({
  imports: [
    CommunicationModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
})
export class MainModule {}
