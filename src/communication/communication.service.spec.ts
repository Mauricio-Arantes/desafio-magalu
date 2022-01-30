import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationStatus, CommunicationTypes } from '@prisma/client';

import { CommunicationService } from './communication.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';

let service: CommunicationService;

const expectedMinimalDto: CreateCommunicationDto = {
  shipping_date: new Date().toString(),
  recipient: 'Boneco de teste',
  message: {
    type: CommunicationTypes.EMAIL,
  },
};

const commomResponse = {
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
};

const mockCommunicationService = {
  create: jest.fn().mockResolvedValue(commomResponse),
  findMany: jest.fn().mockResolvedValue([commomResponse]),
  findUnique: jest.fn().mockResolvedValue(commomResponse),
  update: jest.fn().mockResolvedValue({
    ...commomResponse,
    status: CommunicationStatus.SENT,
  }),
  delete: jest.fn().mockResolvedValue(undefined),
};

describe('CommunicationService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationService],
    })
      .overrideProvider(CommunicationService)
      .useValue(mockCommunicationService)
      .compile();

    service = module.get<CommunicationService>(CommunicationService);
  });

  it('should be instancied', () => {
    expect(service).toBeDefined();
  });
});

describe('findAll', () => {
  it('should return an array of communications', async () => {
    // Escrever teste
  });
});
