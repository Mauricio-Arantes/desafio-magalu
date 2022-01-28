import { IsNumber, IsUUID } from 'class-validator';

export class FindOneCommunicationDto {
  @IsUUID()
  id: string;
}
