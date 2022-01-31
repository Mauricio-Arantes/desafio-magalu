import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommunicationStatus, CommunicationTypes } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUppercase,
  ValidateNested,
} from 'class-validator';

export class NestedMessagesDto {
  @ApiProperty({ enum: [CommunicationTypes] })
  @IsEnum(CommunicationTypes)
  @IsNotEmpty()
  @IsUppercase()
  type: CommunicationTypes;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;
}

export class CreateCommunicationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  shipping_date: string;

  @ApiPropertyOptional({ enum: [CommunicationStatus] })
  @IsEnum(CommunicationStatus)
  @IsNotEmpty()
  @IsUppercase()
  @IsOptional()
  status?: CommunicationStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recipient: string;

  @ApiProperty({ type: () => NestedMessagesDto })
  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @Type(() => NestedMessagesDto)
  message: NestedMessagesDto;
}
