import { EventRecipient } from 'src/domain/types/event-payload.type';

export function resolveRecipientTarget(recipient: EventRecipient): string | undefined {
  if (recipient.channel === 'EMAIL') {
    const email = recipient.to?.[0];
    return typeof email === 'string' ? email.trim() : undefined;
  }

  if (recipient.channel === 'TELEGRAM') {
    return recipient.chatId?.trim();
  }

  if (recipient.channel === 'GOOGLE_CALENDAR') {
    return recipient.attendee?.trim();
  }

  return recipient.target?.trim();
}

export function isRecipientTargetValid(recipient: EventRecipient): boolean {
  const target = resolveRecipientTarget(recipient);
  return Boolean(target);
}
