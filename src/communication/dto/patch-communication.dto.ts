import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PatchCommunicationDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
