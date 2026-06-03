export interface EventRecipient {
  channel: string;
  subject?: string;
  message?: string;
  to?: string[];
  chatId?: string;
  attendee?: string;
  target?: string;
  [key: string]: unknown;
}

export interface EventPayload {
  recipients?: EventRecipient[];
  [key: string]: unknown;
}
