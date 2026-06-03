import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { BaseController } from 'src/shared/core/base.controller';
import { ApiCrudDoc } from 'src/config/swagger/crud';
import { Event } from 'src/domain/entities/event';
import { EventService } from 'src/app/services/event.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event';
import { EventResponseSchema } from '../schemas';

@Controller('events')
@ApiCrudDoc({
  tag: 'Eventos',
  createDto: CreateEventDto,
  updateDto: UpdateEventDto,
  responseDto: EventResponseSchema,
})
export class EventController extends BaseController<
  Event,
  CreateEventDto,
  UpdateEventDto
> {
  constructor(private readonly eventService: EventService) {
    super(eventService);
  }

  @Post()
  @ApiBody({ type: CreateEventDto })
  create(@Body() dto: CreateEventDto) {
    return this.eventService.createFromDto(dto);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Obtener evento por código' })
  @ApiParam({ name: 'code', example: 'EVT_PAGO_RECHAZADO' })
  @ApiOkResponse({ type: EventResponseSchema })
  findByCode(@Param('code') code: string) {
    return this.eventService.findByCode(code);
  }

  @Get('client-system/:clientSystemId')
  @ApiOperation({ summary: 'Listar eventos por sistema cliente' })
  @ApiParam({
    name: 'clientSystemId',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({ type: [EventResponseSchema] })
  findByClientSystemId(@Param('clientSystemId') clientSystemId: string) {
    return this.eventService.findByClientSystemId(clientSystemId);
  }
}
