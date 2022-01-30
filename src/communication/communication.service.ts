import { Injectable } from '@nestjs/common';
import { Communications } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { DeleteCommunicationDto } from './dto/delete-communication.dto';
import { FindAllCommunicationDto } from './dto/findall-communication.dto';
import { FindOneCommunicationDto } from './dto/findOne-communication.dto';
import { PatchCommunicationDto } from './dto/patch-communication.dto';
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
      include: { message: true },
    });
  }

  findAll({ maxValue, initialValue }: FindAllCommunicationDto) {
    if (initialValue > 0 && maxValue > 0) {
      return this.prisma.communications.findMany({
        skip: initialValue,
        take: maxValue,
        include: { message: true },
      });
    }
    return this.prisma.communications.findMany({ include: { message: true } });
  }

  findOne({ id }: FindOneCommunicationDto) {
    return this.prisma.communications.findUnique({
      where: { id },
      include: { message: true },
    });
  }

  update(
    { id }: PatchCommunicationDto,
    updateCommunicationDto: UpdateCommunicationDto,
  ) {
    return this.prisma.communications.update({
      where: { id },
      data: {
        ...updateCommunicationDto,
        message: {
          update: {
            ...updateCommunicationDto['message'],
          },
        },
      },
      include: { message: true },
    });
  }

  async remove({ id }: DeleteCommunicationDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const communication = await prisma.communications.delete({
        where: { id },
      });

      await prisma.messages.delete({
        where: { id: communication.message_id },
      });
    });
  }
}
