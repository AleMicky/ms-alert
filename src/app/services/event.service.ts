import { BadRequestException, Injectable } from '@nestjs/common';

import { BaseService } from 'src/shared/core/base.service';
import { Event } from 'src/domain/entities/event';
import { EventRepository } from 'src/domain/repositories/event.repository';
import { ClientSystemRepository } from 'src/domain/repositories/client-system.repository';
import { EventTypeRepository } from 'src/domain/repositories/event-type.repository';
import { CreateEventDto } from 'src/presentation/dto/event/create-event.dto';

import { AlertService } from './alert.service';
import { EventStatus } from 'src/domain/enums/event-status.enum';

@Injectable()
export class EventService extends BaseService<Event> {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly clientSystemRepository: ClientSystemRepository,
    private readonly eventTypeRepository: EventTypeRepository,
    private readonly alertService: AlertService,
  ) {
    super(eventRepository);
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const clientSystem =
      await this.clientSystemRepository.findByCode(dto.clientSystemCode);

    if (!clientSystem) {
      throw new BadRequestException('Sistema cliente no encontrado');
    }

    const eventType =
      await this.eventTypeRepository.findByCode(
        clientSystem.id,
        dto.eventTypeCode,
      );

    if (!eventType) {
      throw new BadRequestException('Tipo de evento no encontrado');
    }

    if (!eventType.severityLevel) {
      throw new BadRequestException(
        'El tipo de evento no tiene severidad configurada',
      );
    }

    const event = await this.eventRepository.create({
      clientSystem,
      severityLevel: eventType.severityLevel,
      code: this.generateEventCode(),
      eventType: dto.eventTypeCode,
      title: dto.title,
      message: dto.message,
      payloadJson: dto.payloadJson,
      status: EventStatus.PENDING,
      eventDate: new Date(),
      active: dto.active ?? true,
    });

    await this.alertService.createFromEvent(event);

    return event;
  }

  findByCode(code: string) {
    return this.eventRepository.findByCode(code);
  }

  findByClientSystemId(clientSystemId: string) {
    return this.eventRepository.findByClientSystemId(clientSystemId);
  }

  private generateEventCode(): string {
    return `EVT-${Date.now()}`;
  }
}