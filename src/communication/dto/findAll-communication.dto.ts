import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class FindAllCommunicationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  initialValue?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxValue?: number;
}
