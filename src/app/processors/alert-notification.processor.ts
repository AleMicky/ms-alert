import { Injectable, Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { AlertNotificationService } from 'src/app/services/alert-notification.service';
import { N8nClient } from 'src/infrastructure/integrations/n8n/n8n.client';
import { AlertService } from '../services/alert.service';
import { EventService } from '../services/event.service';

@Processor('alert-notifications')
@Injectable()
export class AlertNotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(AlertNotificationProcessor.name);

  constructor(
    private readonly alertNotificationService: AlertNotificationService,
    private readonly alertService: AlertService,
    private readonly eventService: EventService,
    private readonly n8nClient: N8nClient,
  ) {
    super();
  }

  async process(
    job: Job<{ alertNotificationId: string }>,
  ): Promise<void> {
    const { alertNotificationId } = job.data;

    const notification =
      await this.alertNotificationService.findOne(alertNotificationId);

    if (!notification) {
      this.logger.warn(`Notificación no encontrada: ${alertNotificationId}`);
      return;
    }

    try {
      await this.alertNotificationService.update(notification.id, {
        status: 'PROCESSING',
      });

      const response = await this.n8nClient.sendNotification({
        notificationId: notification.id,
        channel: notification.notificationChannel.code,
        target: notification.target,
        title: notification.title,
        message: notification.message,
        severity: notification.alert.severityLevel.code,
        system: notification.alert.event.clientSystem.code,
        eventType: notification.alert.event.eventType,
        payload: notification.alert.event.payloadJson,
      });

      await this.alertNotificationService.update(notification.id, {
        status: 'SENT',
        sentAt: new Date(),
        responseJson: response,
      });
      await this.alertService.update(
        notification.alert.id,
        {
          status: 'NOTIFIED',
        },
      );

      await this.eventService.update(
        notification.alert.event.id,
        {
          status: 'PROCESSED',
          processedAt: new Date(),
        },
      );

    } catch (error) {
      await this.alertNotificationService.update(notification.id, {
        status: 'FAILED',
        errorMessage: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }
}