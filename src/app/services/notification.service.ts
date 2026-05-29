import { Injectable } from '@nestjs/common';
import {
  N8nClient,
  N8nNotificationPayload,
} from 'src/infrastructure/integrations/n8n/n8n.client';

@Injectable()
export class NotificationService {
  constructor(private readonly n8nClient: N8nClient) {}

  sendToN8n(payload: N8nNotificationPayload) {
    return this.n8nClient.sendNotification(payload);
  }
}
