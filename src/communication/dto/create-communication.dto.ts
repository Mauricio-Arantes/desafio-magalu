import { IsString } from 'class-validator';

enum TypeCommunicationDto {
  email,
  sms,
  push,
  whatsapp,
}

export class CreateCommunicationDto {
  @IsString()
  shippingSchedule: string;

  @IsString()
  receiver: string;
  message: {
    type: TypeCommunicationDto;
    content?: string;
  };
}
