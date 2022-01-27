import { CommunicationTypes } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class NestedMessagesDto {
  @IsEnum(CommunicationTypes)
  @IsNotEmpty()
  type: CommunicationTypes;

  @IsString()
  content?: string;
}

export class CreateCommunicationDto {
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  shipping_date: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @ValidateNested()
  @IsNotEmptyObject()
  message?: NestedMessagesDto;
}
