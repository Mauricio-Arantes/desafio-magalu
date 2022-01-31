import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';

import { CommunicationModule } from './communication/communication.module';
import { configs } from './configs';

@Module({
  imports: [
    CommunicationModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      ...configs.cache.redis,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class MainModule {}
