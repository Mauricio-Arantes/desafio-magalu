import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Communications } from '@prisma/client';

import { CommunicationErrors } from '../api-errors/communication';
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
  private readonly logger = new Logger(CommunicationService.name);

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

  async findOne({ id }: FindOneCommunicationDto) {
    const result = await this.prisma.communications.findUnique({
      where: { id },
      include: { message: true },
    });

    if (!result) {
      this.logger.error(`Could not find a communication with ID ${id}`);
      throw new HttpException(
        CommunicationErrors.NotFound,
        CommunicationErrors.NotFound.statusCode,
      );
    }
    return result;
  }

  async update(
    { id }: PatchCommunicationDto,
    updateCommunicationDto: UpdateCommunicationDto,
  ) {
    const { recipient, shipping_date, status, message } =
      updateCommunicationDto;

    const result = await this.prisma.$transaction(async (prisma) => {
      const communication = await prisma.communications.update({
        where: { id },
        data: {
          recipient,
          shipping_date,
          status,
        },
      });

      if (communication['count'] === 0) {
        this.logger.error(`Could not find communication with ID ${id}`);
        throw new HttpException(
          CommunicationErrors.NotFound,
          CommunicationErrors.NotFound.statusCode,
        );
      }

      await prisma.messages.update({
        where: { id },
        data: {
          ...message,
        },
      });

      return await prisma.communications.findUnique({
        where: { id },
        include: { message: true },
      });
    });

    if (!result) {
      this.logger.error(`Could not find communication with ID ${id}`);
      throw new HttpException(
        CommunicationErrors.NotFound,
        CommunicationErrors.NotFound.statusCode,
      );
    }
    return result;
  }

  async remove({ id }: DeleteCommunicationDto) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const communication = await prisma.communications.delete({
        where: { id },
      });

      if (!communication) {
        this.logger.error(`Could not find communication with ID ${id}`);
        throw new HttpException(
          CommunicationErrors.NotFound,
          CommunicationErrors.NotFound.statusCode,
        );
      }

      return await prisma.messages.delete({
        where: { id: communication.message_id },
      });
    });

    if (!result) {
      this.logger.error(`Could not find communication with ID ${id}`);
      throw new HttpException(
        CommunicationErrors.NotFound,
        CommunicationErrors.NotFound.statusCode,
      );
    }
    return result;
  }
}
