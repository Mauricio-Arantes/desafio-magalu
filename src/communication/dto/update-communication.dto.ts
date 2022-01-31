import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CommunicationStatus, CommunicationTypes } from '@prisma/client';

import { CreateCommunicationDto } from './create-communication.dto';

export class UpdateCommunicationDto extends PartialType(
  OmitType(CreateCommunicationDto, ['message']),
) {
  shipping_date?: string;

  @ApiProperty({ enum: CommunicationStatus })
  status?: CommunicationStatus;
  recipient?: string;
  message?: {
    type?: CommunicationTypes;
    content?: string;
  };
}
