import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { CommunicationService } from './communication.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { FindAllCommunicationDto } from './dto/findall-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';

@Controller('communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Post()
  create(@Body() createCommunicationDto: CreateCommunicationDto) {
    return this.communicationService.create(createCommunicationDto);
  }

  @Get()
  findAll(
    @Query('maxValue', ParseIntPipe)
    maxValue: FindAllCommunicationDto['maxValue'],
    @Query('initialValue', ParseIntPipe)
    initialValue: FindAllCommunicationDto['initialValue'],
  ) {
    return this.communicationService.findAll({ maxValue, initialValue });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunicationDto: UpdateCommunicationDto,
  ) {
    return this.communicationService.update(+id, updateCommunicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communicationService.remove(+id);
  }
}
