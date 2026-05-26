import { Alert } from './alert';
import { NotificationChannel } from './notification-channel';

export class AlertNotification {
  id: string;
  alert: Alert;
  notificationChannel: NotificationChannel;
  status: string;
  sentAt?: Date;
  response?: string;
}
