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
  @ApiProperty({ type: 'string', enum: CommunicationTypes })
  @IsEnum(CommunicationTypes)
  @IsNotEmpty()
  @IsUppercase()
  type: CommunicationTypes;

  @ApiPropertyOptional({ description: 'menssage body', default: 'Olá!' })
  @IsString()
  @IsOptional()
  content?: string;
}

export class CreateCommunicationDto {
  @ApiProperty({ description: 'receive a ISO8601 date', format: 'date' })
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  shipping_date: string;

  @ApiPropertyOptional({ type: 'string', enum: CommunicationStatus })
  @IsEnum(CommunicationStatus)
  @IsNotEmpty()
  @IsUppercase()
  @IsOptional()
  status?: CommunicationStatus;

  @ApiProperty({ default: 'Mario Roberto', description: 'recipient name' })
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
