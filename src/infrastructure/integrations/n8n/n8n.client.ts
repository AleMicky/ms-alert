import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface N8nAlertPayload {
  channel: string;
  title: string;
  message: string;
  severity: string;
  system: string;
  eventType: string;
  payload?: Record<string, any>;
}

@Injectable()
export class N8nClient {
  constructor(private readonly configService: ConfigService) {}

  async sendAlert(payload: N8nAlertPayload): Promise<any> {
    const webhookUrl = this.configService.get<string>('N8N_WEBHOOK_URL');

    if (!webhookUrl) {
      throw new Error('N8N_WEBHOOK_URL no configurado');
    }

    const response = await axios.post(webhookUrl, payload);

    return response.data;
  }
}
