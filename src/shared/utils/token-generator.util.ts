import { randomBytes } from 'crypto';

export function generateSecureToken(prefix = 'cst'): string {
  return `${prefix}_${randomBytes(32).toString('base64url')}`;
}
