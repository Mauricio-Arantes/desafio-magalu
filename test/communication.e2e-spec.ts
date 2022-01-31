import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { CommunicationModule } from '../src/communication/communication.module';
import { PrismaService } from '../src/database/prisma.service';

const mockPrismaRepository = {
  communications: {
    findMany: jest.fn(),
  },
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommunicationModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  it('/communication (GET)', () => {
    return request(app.getHttpServer())
      .get('/communication')
      .expect(200)
      .expect('Hello World!');
  });
});
