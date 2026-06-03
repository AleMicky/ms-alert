import { Injectable, Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { AlertNotificationService } from 'src/app/services/alert-notification.service';
import { AlertService } from '../services/alert.service';
import { EventService } from '../services/event.service';

import { N8nClient } from 'src/infrastructure/integrations/n8n/n8n.client';

import { AlertNotificationStatus } from 'src/domain/enums/alert-notification-status.enum';
import { AlertStatus } from 'src/domain/enums/alert-status.enum';
import { EventStatus } from 'src/domain/enums/event-status.enum';

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
    job: Job<{
      alertNotificationId: string;
    }>,
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
        status: AlertNotificationStatus.PROCESSING,
      });

      const webhookUrl = notification.notificationChannel.webhookUrl;

      if (!webhookUrl) {
        throw new Error(
          `Webhook URL no configurada para el canal ${notification.notificationChannel.code}`,
        );
      }

      const response = await this.n8nClient.sendNotification(webhookUrl, {
        notificationId: notification.id,
        channel: notification.notificationChannel.code,
        payload: notification.payloadJson ?? {},
      });

      await this.alertNotificationService.update(notification.id, {
        status: AlertNotificationStatus.SENT,
        sentAt: new Date(),
        responseJson: response,
      });

      await this.alertService.update(notification.alert.id, {
        status: AlertStatus.NOTIFIED,
      });

      await this.eventService.update(notification.alert.event.id, {
        status: EventStatus.PROCESSED,
        processedAt: new Date(),
      });

      this.logger.log(`Notificación enviada: ${notification.id}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      await this.alertNotificationService.update(notification.id, {
        status: AlertNotificationStatus.FAILED,
        errorMessage,
      });

      this.logger.error(
        `Error enviando notificación: ${notification.id}`,
        errorMessage,
      );

      throw error;
    }
  }
}