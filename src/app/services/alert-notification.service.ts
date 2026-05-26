import { Injectable } from '@nestjs/common';

import { BaseService } from 'src/shared/core/base.service';
import { AlertNotification } from 'src/domain/entities/alert-notification';
import { AlertNotificationRepository } from 'src/domain/repositories/alert-notification.repository';

@Injectable()
export class AlertNotificationService extends BaseService<AlertNotification> {
  constructor(
    private readonly alertNotificationRepository: AlertNotificationRepository,
  ) {
    super(alertNotificationRepository);
  }

  findByAlertId(alertId: string) {
    return this.alertNotificationRepository.findByAlertId(alertId);
  }

  findByStatus(status: string) {
    return this.alertNotificationRepository.findByStatus(status);
  }
}
