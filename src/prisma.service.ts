import {
  INestApplication,
  Injectable,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      // Soft delete middleware
      if (params.action == 'delete') {
        params.action = 'update';
        params.args['data'] = {
          ...params.args['data'],
          deleted_at: new Date(),
        };
      }
      if (params.action == 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data != undefined) {
          params.args.data['deleted_at'] = Date.now();
        } else {
          params.args['data'] = { deleted_at: Date.now() };
        }
      }

      // Not searching soft delete datas
      let findMethod = false;
      switch (params.action) {
        case 'findUnique':
          params.action = 'findFirst';
          findMethod = true;
          break;
        case 'update':
          params.action = 'updateMany';
          findMethod = true;
          break;
        case 'findMany':
          findMethod = true;
          break;
        case 'updateMany':
          findMethod = true;
          break;
      }
      if (findMethod) {
        params.args['where'] = {
          ...params.args['where'],
          deleted_at: null,
        };
      }
      return next(params);
    });
  }

  async enableShutdonHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
