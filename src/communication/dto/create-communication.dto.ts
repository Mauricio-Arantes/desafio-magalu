enum TypeCommunicationDto {
  email,
  sms,
  push,
  whatsapp,
}

export class CreateCommunicationDto {
  shippingSchedule: string;
  destiner: string;
  message: {
    type: TypeCommunicationDto;
    content?: string;
  };
}
