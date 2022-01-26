enum TypeCommunicationDto {
  email,
  sms,
  push,
  whatsapp,
}

export class CreateCommunicationDto {
  shippingSchedule: string;
  receiver: string;
  message: {
    type: TypeCommunicationDto;
    content?: string;
  };
}
