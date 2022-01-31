import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CommunicationService } from './communication.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { DeleteCommunicationDto } from './dto/delete-communication.dto';
import { FindAllCommunicationDto } from './dto/findAll-communication.dto';
import { FindOneCommunicationDto } from './dto/findOne-communication.dto';
import { PatchCommunicationDto } from './dto/patch-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';

@Controller('communication')
@ApiTags('communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a communication' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCommunicationDto: CreateCommunicationDto) {
    return this.communicationService.create(createCommunicationDto);
  }

  @Get()
  findAll(
    @Query('maxValue', new DefaultValuePipe(0), ParseIntPipe)
    maxValue: FindAllCommunicationDto['maxValue'],
    @Query('initialValue', new DefaultValuePipe(0), ParseIntPipe)
    initialValue: FindAllCommunicationDto['initialValue'],
  ) {
    return this.communicationService.findAll({ maxValue, initialValue });
  }

  @Get(':id')
  findOne(@Param() params: FindOneCommunicationDto) {
    return this.communicationService.findOne(params);
  }

  @Patch(':id')
  update(
    @Param() params: PatchCommunicationDto,
    @Body() updateCommunicationDto: UpdateCommunicationDto,
  ) {
    return this.communicationService.update(params, updateCommunicationDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: DeleteCommunicationDto) {
    return this.communicationService.remove(params);
  }
}
