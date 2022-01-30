import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, CommunicationTypes, Communications } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';

describe('CommunicationController', () => {
  let controller: CommunicationController;

  const expectedMinimalDto: CreateCommunicationDto = {
    shipping_date: new Date().toString(),
    recipient: 'Boneco de teste',
    message: {
      type: CommunicationTypes.EMAIL,
    },
  };

  const expectedCompleteDto: CreateCommunicationDto = {
    shipping_date: new Date().toString(),
    recipient: 'Boneco de teste do posto',
    message: {
      type: CommunicationTypes.EMAIL,
      content: 'Ta maluco ta doidão',
    },
  };

  const mockCommunicationService = {
    create: jest.fn((dto) => {
      return dto;
    }),
    findAll: jest.fn((maxValue, initialValue) => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationController],
      providers: [CommunicationService, PrismaService],
    })
      .overrideProvider(CommunicationService)
      .useValue(mockCommunicationService)
      .compile();

    controller = module.get<CommunicationController>(CommunicationController);
  });

  it('should be instancied', () => {
    expect(controller).toBeDefined();
  });

  it('should receive the DTO expected data', () => {
    expect(controller.create(expectedMinimalDto)).toBeInstanceOf(
      Prisma.CommunicationsGetPayload,
    );
  });

  it('should get all users', () => {
    const dto = {};
  });
});
