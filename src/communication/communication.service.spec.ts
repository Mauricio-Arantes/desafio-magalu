import { Test, TestingModule } from '@nestjs/testing';
import {
  CommunicationStatus,
  CommunicationTypes,
  prisma,
} from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { CommunicationService } from './communication.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';

let communicationService: CommunicationService;
let prismaService: PrismaService;

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

describe('CommunicationService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationService, PrismaService],
    }).compile();

    communicationService =
      module.get<CommunicationService>(CommunicationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be instancied', () => {
    expect(communicationService).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});

describe('Create', () => {
  it('should create a new communication', async () => {
    prismaService.communications.create = jest
      .fn()
      .mockReturnValueOnce(commomResponse);

    const result = await communicationService.create(expectedMinimalDto);

    expect(result).toEqual(commomResponse);
    expect(prismaService.communications.create).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception', () => {
    jest
      .spyOn(communicationService, 'create')
      .mockRejectedValueOnce(new Error());

    expect(
      communicationService.create(expectedMinimalDto),
    ).rejects.toThrowError();
  });
});

describe('FindAll', () => {
  it('should return a array of communication', async () => {
    prismaService.communications.findMany = jest
      .fn()
      .mockReturnValueOnce([commomResponse]);
    const result = await communicationService.findAll({
      initialValue: 0,
      maxValue: 0,
    });

    expect(result).toEqual([commomResponse]);
    expect(prismaService.communications.findMany).toHaveBeenCalledTimes(1);
  });

  it('should throw a exception', () => {
    jest
      .spyOn(communicationService, 'findAll')
      .mockRejectedValueOnce(new Error());

    expect(
      communicationService.findAll({ initialValue: 0, maxValue: 0 }),
    ).rejects.toThrowError();
  });
});

describe('FindOne', () => {
  it('should return one communication', async () => {
    prismaService.communications.findUnique = jest
      .fn()
      .mockReturnValueOnce(commomResponse);
    const result = await communicationService.findOne({
      id: '19bbd769-55c8-4781-8921-d5337a15c269',
    });

    expect(result).toEqual(commomResponse);
    expect(prismaService.communications.findUnique).toHaveBeenCalledTimes(1);
  });

  it('should throw a exception', () => {
    jest
      .spyOn(communicationService, 'findOne')
      .mockRejectedValueOnce(new Error());

    expect(
      communicationService.findOne({
        id: '19bbd769-55c8-4781-8921-d5337a15c269',
      }),
    ).rejects.toThrowError();
  });
});

describe('Update', () => {
  it('should update one communication', async () => {
    prismaService.communications.update = jest.fn().mockReturnValueOnce({
      ...commomResponse,
      status: CommunicationStatus.SENT,
    });

    const result = await communicationService.update(
      { id: '19bbd769-55c8-4781-8921-d5337a15c269' },
      { ...expectedMinimalDto, status: CommunicationStatus.SENT },
    );

    expect(result).toEqual({
      ...commomResponse,
      status: CommunicationStatus.SENT,
    });
    expect(prismaService.communications.findUnique).toHaveBeenCalledTimes(1);
  });

  it('should throw a exception', () => {
    jest
      .spyOn(communicationService, 'update')
      .mockRejectedValueOnce(new Error());

    expect(
      communicationService.update(
        { id: '19bbd769-55c8-4781-8921-d5337a15c269' },
        { ...expectedMinimalDto, status: CommunicationStatus.SENT },
      ),
    ).rejects.toThrowError();
  });
});
