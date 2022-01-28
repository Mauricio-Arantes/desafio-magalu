import { IsOptional } from 'class-validator';

export class FindAllCommunicationDto {
  @IsOptional()
  initialValue?: number;

  @IsOptional()
  maxValue?: number;
}
