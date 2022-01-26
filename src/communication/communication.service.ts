import { Injectable } from '@nestjs/common';
import { Communications, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

import { UpdateCommunicationDto } from './dto/update-communication.dto';

@Injectable()
export class CommunicationService {
  constructor(private prisma: PrismaService) { }

  async create(createCommunicationDto: Prisma.CommunicationsCreateInput): Promise<Communications> {
    return this.prisma.communications.create({
      data: createCommunicationDto,
    })
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
