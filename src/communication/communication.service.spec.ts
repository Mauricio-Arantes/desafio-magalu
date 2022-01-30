import { Test, TestingModule } from '@nestjs/testing';

import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';

const mockCommunicationService = {
  create: jest.fn(),
  findMany: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CommunicationService', () => {
  let service: CommunicationService;
  let controller: CommunicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationService],
      controllers: [CommunicationController],
    })
      .overrideProvider(CommunicationService)
      .useValue(mockCommunicationService)
      .compile();

    service = module.get<CommunicationService>(CommunicationService);
    controller = module.get<CommunicationController>(CommunicationController);
  });

  it('should be instancied', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
});

describe('findAll', () => {
  it('should return an array of communications', async () => {
    // Escrever teste
  });
});
