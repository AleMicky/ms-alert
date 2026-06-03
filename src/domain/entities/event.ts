import { BaseAuditableEntity } from 'src/shared/core/base-auditable-entity';

import { ClientSystem } from './client-system';
import { SeverityLevel } from './severity-level';
import { EventStatus } from '../enums/event-status.enum';

export class Event extends BaseAuditableEntity {
  id: string;
  clientSystem: ClientSystem;
  code: string;
  eventType: string;
  title: string;
  message: string;
  payloadJson?: Record<string, unknown>;
  severityLevel: SeverityLevel;
  status: EventStatus;
  eventDate: Date;
  processedAt?: Date;
  active: boolean;
}