import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { BaseService } from 'src/shared/core/base.service';
import { Alert } from 'src/domain/entities/alert';
import { AlertNotification } from 'src/domain/entities/alert-notification';

import { AlertNotificationRepository } from 'src/domain/repositories/alert-notification.repository';
import { NotificationChannelRepository } from 'src/domain/repositories/notification-channel.repository';
import { AlertNotificationStatus } from 'src/domain/enums/alert-notification-status.enum';

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
    const eventPayload = alert.event.payloadJson as any;
    const recipients = eventPayload?.recipients ?? [];
  
    const notifications: AlertNotification[] = [];
  
    for (const recipient of recipients) {
      if (!recipient?.channel) continue;
  
      const notificationChannel =
        await this.notificationChannelRepository.findByCode(
          recipient.channel,
        );
  
      if (!notificationChannel || !notificationChannel.active) {
        continue;
      }
  
      const notification = await this.alertNotificationRepository.create({
        alert,
        notificationChannel,
        target: this.resolveTarget(recipient),
        title: recipient.subject ?? alert.title,
        message: recipient.message ?? alert.message,
        payloadJson: this.cleanRecipientPayload(recipient),
        status: AlertNotificationStatus.PENDING,
      });
  
      notifications.push(notification);
  
      await this.alertNotificationQueue.add(
        'send-alert-notification',
        {
          alertNotificationId: notification.id,
        },
      );
    }
  
    return notifications;
  }
  
  private resolveTarget(recipient: any): string {
    if (recipient.channel === 'EMAIL') {
      return recipient.to?.[0];
    }
  
    if (recipient.channel === 'TELEGRAM') {
      return recipient.chatId;
    }
  
    if (recipient.channel === 'GOOGLE_CALENDAR') {
      return recipient.attendee;
    }
  
    return recipient.target;
  }
  
  private cleanRecipientPayload(recipient: any): Record<string, any> {
    const { channel, ...payload } = recipient;
    return payload;
  }

  findByAlertId(alertId: string) {
    return this.alertNotificationRepository.findByAlertId(alertId);
  }

  findByStatus(status: string) {
    return this.alertNotificationRepository.findByStatus(status);
  }
}