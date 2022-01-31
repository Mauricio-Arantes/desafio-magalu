import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindAllCommunicationDto {
  @ApiPropertyOptional()
  @IsOptional()
  initialValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  maxValue?: number;
}
