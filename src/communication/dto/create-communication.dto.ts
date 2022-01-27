import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { CommunicationTypes } from '@prisma/client'

class NestedMessagesDto {
  @IsEnum(CommunicationTypes)
  type: CommunicationTypes;

  @IsString()
  content?: string
}

export class CreateCommunicationDto {
  @IsString()
  shipping_date: string;

  @IsString()
  recipient: string;

  @ValidateNested()
  message?: NestedMessagesDto;
}
