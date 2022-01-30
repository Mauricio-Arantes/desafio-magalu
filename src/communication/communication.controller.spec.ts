import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationTypes } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';

describe('CommunicationController', () => {
  let controller: CommunicationController;
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
    findAll: jest.fn().mockResolvedValue([commomResponse]),
    findOne: jest.fn().mockResolvedValue(commomResponse),
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
    service = module.get<CommunicationService>(CommunicationService);
  });

  it('should be instancied', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create a new communication', async () => {
      const result = await controller.create(expectedMinimalDto);

      expect(result).toEqual(commomResponse);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toBeCalledWith(expectedMinimalDto);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(controller.create(expectedMinimalDto)).rejects.toThrowError();
    });
  });

  describe('FindAll', () => {
    it('should return a array of communication', async () => {
      const result = await controller.findAll(0, 0);

      expect(result).toEqual([commomResponse]);
    });

    it('should throw a exception', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      expect(controller.findAll(0, 0)).rejects.toThrowError();
    });

    // it('should throw a error when passed the wrong parameters', () => {
    //   expect(controller.findAll('a', 'c')).rejects.toThrowError();
    // });
  });

  describe('FindOne', () => {
    it('should get one communication', async () => {
      const result = await controller.findOne({
        id: '19bbd769-55c8-4781-8921-d5337a15c269',
      });

      expect(result).toEqual(commomResponse);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).lastCalledWith({
        id: '19bbd769-55c8-4781-8921-d5337a15c269',
      });
    });

    it('should throw a exception', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      expect(
        controller.findOne({ id: '19bbd769-55c8-4781-8921-d5337a15c269' }),
      ).rejects.toThrowError();
    });
  });
});
