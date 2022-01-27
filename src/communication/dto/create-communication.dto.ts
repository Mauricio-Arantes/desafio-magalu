import { IsDateString, IsEnum, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import { CommunicationTypes } from '@prisma/client'

class NestedMessagesDto {
  @IsEnum(CommunicationTypes)
  @IsNotEmpty()
  type: CommunicationTypes;

  @IsString()
  content?: string
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
