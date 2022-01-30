import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../database/prisma.service';
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';

describe('CommunicationService', () => {
  let service: CommunicationService;
  let controller: CommunicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationService, PrismaService],
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
