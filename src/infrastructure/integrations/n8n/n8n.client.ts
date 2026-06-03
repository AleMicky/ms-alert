import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface N8nNotificationPayload {
  notificationId: string;
  channel: string;
  target: string;
  title: string;
  message: string;
  payload: Record<string, unknown>;
}

@Injectable()
export class N8nClient {
  async sendNotification(
    webhookUrl: string,
    body: N8nNotificationPayload,
  ): Promise<unknown> {
    if (!webhookUrl) {
      throw new Error('Webhook URL no configurada');
    }

    const response = await axios.post(webhookUrl, body, {
      timeout: 30000,
      validateStatus: (status) => status >= 200 && status < 300,
    });

    return response.data;
  }
}
