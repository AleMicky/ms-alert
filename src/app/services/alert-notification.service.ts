import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { BaseService } from 'src/shared/core/base.service';

import { Alert } from 'src/domain/entities/alert';
import { AlertNotification } from 'src/domain/entities/alert-notification';

import { AlertNotificationRepository } from 'src/domain/repositories/alert-notification.repository';
import { NotificationChannelRepository } from 'src/domain/repositories/notification-channel.repository';

@Injectable()
export class AlertNotificationService extends BaseService<AlertNotification> {
  constructor(
    private readonly alertNotificationRepository: AlertNotificationRepository,
    private readonly notificationChannelRepository: NotificationChannelRepository,

    @InjectQueue('alert-notifications')
    private readonly alertNotificationQueue: Queue,
  ) {
    super(alertNotificationRepository);
  }

  async createFromAlert(alert: Alert): Promise<AlertNotification[]> {
    const payload = alert.event.payloadJson as any;

    const channels: string[] = payload?.channels ?? [];

    const notifications: AlertNotification[] = [];

    for (const channelCode of channels) {
      const notificationChannel =
        await this.notificationChannelRepository.findByCode(channelCode);

      if (!notificationChannel || !notificationChannel.active) {
        continue;
      }

      const target = this.resolveTarget(channelCode, payload);

      if (!target) {
        continue;
      }

      const notification = await this.alertNotificationRepository.create({
        alert,
        notificationChannel,
        target,
        title: alert.title,
        message: alert.message,
        status: 'PENDING',
      });

      notifications.push(notification);

      await this.alertNotificationQueue.add(
        'send-alert-notification',
        {
          alertNotificationId: notification.id,
        },
        {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
        },
      );
    }

    return notifications;
  }

  findByAlertId(alertId: string) {
    return this.alertNotificationRepository.findByAlertId(alertId);
  }

  findByStatus(status: string) {
    return this.alertNotificationRepository.findByStatus(status);
  }

  private resolveTarget(
    channelCode: string,
    payload: any,
  ): string | null {
    if (channelCode === 'EMAIL') {
      return payload?.approver?.email ?? null;
    }

    if (channelCode === 'TELEGRAM') {
      return payload?.approver?.telegramChatId ?? null;
    }

    if (channelCode === 'WHATSAPP') {
      return payload?.approver?.phone ?? null;
    }

    if (channelCode === 'TEAMS') {
      return payload?.approver?.teamsWebhook ?? null;
    }

    if (channelCode === 'GOOGLE_CALENDAR') {
      return payload?.calendar?.target ?? null;
    }

    return null;
  }
}

