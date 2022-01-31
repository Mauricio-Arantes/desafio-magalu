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
      const actions = {
        findUnique: () => {
          params.action = 'findFirst';
          PrismaService.addDeleteAtOnSearch(params);
        },
        update: () => {
          params.action = 'findFirst';
          PrismaService.addDeleteAtOnSearch(params);
        },
        findMany: () => {
          PrismaService.addDeleteAtOnSearch(params);
        },
        updateMany: () => {
          PrismaService.addDeleteAtOnSearch(params);
        },
      };

      actions[params.action]();

      return next(params);
    });
  }

  async enableShutdonHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
