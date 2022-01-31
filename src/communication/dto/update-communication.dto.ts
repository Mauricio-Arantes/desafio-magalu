import { PartialType } from '@nestjs/mapped-types';
import { CommunicationStatus, CommunicationTypes } from '@prisma/client';

import { CreateCommunicationDto } from './create-communication.dto';

export class UpdateCommunicationDto extends PartialType(
  CreateCommunicationDto,
) {
  shipping_date: string;
  status?: CommunicationStatus;
  recipient: string;
  message: {
    type: CommunicationTypes;
    content?: string;
  };
}
