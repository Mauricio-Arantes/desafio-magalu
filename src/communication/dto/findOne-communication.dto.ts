import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindOneCommunicationDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
