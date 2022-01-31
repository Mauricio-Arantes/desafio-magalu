import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private static addDeleteAtOnSearch(params) {
    params.args['where'] = {
      ...params.args['where'],
      deleted_at: null,
    };
  }
  private readonly logger = new Logger(PrismaService.name);

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
      let saveMethod = false;
      const actions = {
        findUnique: () => {
          params.action = 'findFirst';
          PrismaService.addDeleteAtOnSearch(params);
          saveMethod = true;
        },
        update: () => {
          params.action = 'updateMany';
          PrismaService.addDeleteAtOnSearch(params);
          saveMethod = true;
        },
        findMany: () => {
          PrismaService.addDeleteAtOnSearch(params);
          saveMethod = true;
        },
        updateMany: () => {
          PrismaService.addDeleteAtOnSearch(params);
          saveMethod = true;
        },
      };

      if (saveMethod) {
        actions[params.action]();
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
