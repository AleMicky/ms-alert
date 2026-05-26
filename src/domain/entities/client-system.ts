import { BaseAuditableEntity } from 'src/shared/core/base-auditable-entity';

import { ClientSystemToken } from './client-system-token';

export class ClientSystem extends BaseAuditableEntity {
  id: string;
  code: string;
  name: string;
  description?: string;
  active: boolean;
  tokens?: ClientSystemToken[];
}
