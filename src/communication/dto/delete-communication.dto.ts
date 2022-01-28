import { IsUUID } from 'class-validator';

export class DeleteCommunicationDto {
  @IsUUID()
  id: string;
}
