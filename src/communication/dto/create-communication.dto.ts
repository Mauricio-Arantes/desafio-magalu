import { IsEnum, IsString, ValidateNested } from 'class-validator';

enum TypeCommunicationDto {
  email,
  sms,
  push,
  whatsapp,
}

export class CreateCommunicationDto {
  @IsString()
  shipping_date: string;

  @IsString()
  recipient: string;

  @ValidateNested()
  message: NestedMessagesDto;
}

class NestedMessagesDto {
  @IsEnum(TypeCommunicationDto)
  type: TypeCommunicationDto;

  @IsString()
  content?: string
}
