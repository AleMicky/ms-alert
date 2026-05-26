import { BaseAuditableEntity } from 'src/shared/core/base-auditable-entity';

import { ClientSystem } from './client-system';
import { SeverityLevel } from './severity-level';

export class Event extends BaseAuditableEntity {
  id: string;
  clientSystem: ClientSystem;
  code: string;
  eventType: string;
  title: string;
  message: string;
  payloadJson?: Record<string, unknown>;
  severityLevel: SeverityLevel;
  status: string;
  eventDate: Date;
  processedAt?: Date;
  active: boolean;
}
/*1. POST /events
2. Crear event
3. Crear alert
4. Leer channels del payloadJson
5. Validar channels activos en notification_channels
6. Crear notifications
7. Enviar cada notification a n8n
8. Actualizar notification.status = SENT / FAILED */