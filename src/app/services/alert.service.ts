import { Injectable } from '@nestjs/common';

import { BaseService } from 'src/shared/core/base.service';
import { Alert } from 'src/domain/entities/alert';
import { AlertRepository } from 'src/domain/repositories/alert.repository';

@Injectable()
export class AlertService extends BaseService<Alert> {
  constructor(private readonly alertRepository: AlertRepository) {
    super(alertRepository);
  }

  findByEventId(eventId: string) {
    return this.alertRepository.findByEventId(eventId);
  }

  findByStatus(status: string) {
    return this.alertRepository.findByStatus(status);
  }
}
