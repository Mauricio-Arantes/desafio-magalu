import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import * as redisStore from 'cache-manager-redis-store';

import { CommunicationModule } from './communication/communication.module';
import { configs } from './configs';
import HealthModule from './health/health.module';

@Module({
  imports: [
    CommunicationModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      ...configs.cache.redis,
    }),
    TerminusModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class MainModule {}
