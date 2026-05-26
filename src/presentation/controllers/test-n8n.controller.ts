import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { NotificationService } from 'src/app/services/notification.service';
import { SendTestN8nDto } from '../dto/test-n8n/send-test-n8n.dto';

@Controller('test-n8n')
@ApiTags('Pruebas')
export class TestN8nController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Enviar una notificación de prueba a n8n' })
  @ApiBody({ type: SendTestN8nDto })
  @ApiOkResponse({
    description: 'Respuesta del webhook de n8n',
    schema: {
      type: 'object',
      additionalProperties: true,
      example: { ok: true, channel: 'TELEGRAM' },
    },
  })
  send(@Body() body: SendTestN8nDto) {
    return this.notificationService.sendToN8n({
      channel: body.channel ?? 'TELEGRAM',
      title: body.title ?? 'Prueba MS Alert',
      message: body.message ?? 'Mensaje enviado desde NestJS hacia n8n',
      severity: body.severity ?? 'HIGH',
      system: body.system ?? 'MS_ALERTAS',
      eventType: body.eventType ?? 'TEST_EVENT',
      payload: body.payload ?? {},
    });
  }
}
