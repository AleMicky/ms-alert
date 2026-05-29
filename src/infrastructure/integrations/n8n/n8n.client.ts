import { Injectable, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface N8nNotificationPayload {
  notificationId: string;
  channel: string;
  target: string;
  title: string;
  message: string;
  severity: string;
  system: string;
  eventType: string;
  payload?: Record<string, any>;
}

@Injectable()
export class N8nClient {

  constructor(private readonly configService: ConfigService) { }
  
  async sendNotification(payload: N8nNotificationPayload): Promise<any> {
    const webhookUrl = this.configService.get<string>('N8N_WEBHOOK_URL');
    if (!webhookUrl) {
      throw new Error(
        'N8N_WEBHOOK_URL no configurado',
      );
    }

    const response = await axios.post(webhookUrl, payload);

    return response.data;
  }
}