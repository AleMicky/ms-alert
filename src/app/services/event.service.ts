import { Injectable } from '@nestjs/common';

import { BaseService } from 'src/shared/core/base.service';
import { Event } from 'src/domain/entities/event';
import { EventRepository } from 'src/domain/repositories/event.repository';

@Injectable()
export class EventService extends BaseService<Event> {
  constructor(private readonly eventRepository: EventRepository) {
    super(eventRepository);
  }

  findByCode(code: string) {
    return this.eventRepository.findByCode(code);
  }

  findByClientSystemId(clientSystemId: string) {
    return this.eventRepository.findByClientSystemId(clientSystemId);
  }
}
