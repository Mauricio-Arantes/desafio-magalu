import { Injectable } from '@nestjs/common';
import { Communications } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';

@Injectable()
export class CommunicationService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCommunicationDto: CreateCommunicationDto,
  ): Promise<Communications> {
    const { recipient, shipping_date, message } = createCommunicationDto;

    return this.prisma.communications.create({
      data: {
        recipient,
        shipping_date,
        message: {
          create: { ...message },
        },
      },
    });
  }

  findAll() {
    return `This action returns all communication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communication`;
  }

  update(id: number, updateCommunicationDto: UpdateCommunicationDto) {
    return `This action updates a #${id} communication`;
  }

  remove(id: number) {
    return `This action removes a #${id} communication`;
  }
}
