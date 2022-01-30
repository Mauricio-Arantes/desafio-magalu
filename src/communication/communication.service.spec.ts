import { Test, TestingModule } from '@nestjs/testing';

import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';

describe('CommunicationService', () => {
  let service: CommunicationService;
  let controller: CommunicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationService],
      controllers: [CommunicationController],
    }).compile();

    service = module.get<CommunicationService>(CommunicationService);
    controller = module.get<CommunicationController>(CommunicationController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
});

describe('findAll', () => {
  it('should return an array of communications', async () => {
    // Escrever teste
  });
});
