import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface N8nNotificationPayload {
  notificationId: string;
  channel: string;
  payload: Record<string, any>;
}

@Injectable()
export class N8nClient {
  async sendNotification(
    webhookUrl: string,
    payload: N8nNotificationPayload,
  ): Promise<any> {
    if (!webhookUrl) {
      throw new Error('Webhook URL no configurada');
    }

    const response = await axios.post(webhookUrl, payload, {
      timeout: 30000,
    });

    return response.data;
  }
}