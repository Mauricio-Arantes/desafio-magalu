import { IsUUID } from 'class-validator';

export class PatchCommunicationDto {
  @IsUUID()
  id: string;
}
