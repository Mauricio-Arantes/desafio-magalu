import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { CommunicationModule } from '../src/communication/communication.module';
import { PrismaService } from '../src/database/prisma.service';

const payload = {
  commomResponse: {
    id: '19bbd769-55c8-4781-8921-d5337a15c269',
    shipping_date: '2022-01-28T02:23:56.747Z',
    recipient: 'Boneco de teste',
    status: 'PENDING',
    deleted_at: null,
    updated_at: '2022-01-28T02:23:56.794Z',
    created_at: '2022-01-28T02:23:56.793Z',
    message_id: '1dd15369-94e5-431f-b9ab-18d9c259405e',
    message: {
      id: '1dd15369-94e5-431f-b9ab-18d9c259405e',
      type: 'EMAIL',
      content: null,
      deleted_at: null,
      updated_at: '2022-01-28T02:23:56.794Z',
      created_at: '2022-01-28T02:23:56.793Z',
    },
  },
};

const mockPrismaRepository = {
  communications: {
    findMany: jest.fn().mockResolvedValueOnce([payload.commomResponse]),
    findUnique: jest.fn().mockResolvedValueOnce(payload.commomResponse),
  },
};

describe('CommunicationModule (functional)', () => {
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

  describe('GET ALL', () => {
    it('/communication (GET)', () => {
      return request(app.getHttpServer())
        .get('/communication')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [payload.commomResponse]);
    });
  });

  describe('GET ONE', () => {
    it('/communication/:id --> its a valid id', () => {
      return request(app.getHttpServer())
        .get('/communication/19bbd769-55c8-4781-8921-d5337a15c269')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, payload.commomResponse);
    });
    it('/communication/:id --> id its not a valid uuid', () => {
      return request(app.getHttpServer())
        .get('/communication/this-is-not-a-valid-uuid')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, {
          statusCode: 400,
          message: ['id must be a UUID'],
          error: 'Bad Request',
        });
    });
    it('/communication/:id --> id its not exists', () => {
      return request(app.getHttpServer())
        .get('/communication/19bbd779-55c8-4781-8921-d5337a15c269')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
});
