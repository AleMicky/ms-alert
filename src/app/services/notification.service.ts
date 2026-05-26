import { Injectable } from '@nestjs/common';
import {
  N8nClient,
  N8nAlertPayload,
} from 'src/infrastructure/integrations/n8n/n8n.client';

@Injectable()
export class NotificationService {
  constructor(private readonly n8nClient: N8nClient) {}

  sendToN8n(payload: N8nAlertPayload) {
    return this.n8nClient.sendAlert(payload);
  }
}
