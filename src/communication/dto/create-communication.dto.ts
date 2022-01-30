import { CommunicationStatus, CommunicationTypes } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUppercase,
  ValidateNested,
} from 'class-validator';

export class NestedMessagesDto {
  @IsEnum(CommunicationTypes)
  @IsNotEmpty()
  @IsUppercase()
  type: CommunicationTypes;

  @IsString()
  @IsOptional()
  content?: string;
}

export class CreateCommunicationDto {
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  shipping_date: string;

  @IsEnum(CommunicationStatus)
  @IsNotEmpty()
  @IsUppercase()
  @IsOptional()
  status?: CommunicationStatus;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @Type(() => NestedMessagesDto)
  message: NestedMessagesDto;
}
