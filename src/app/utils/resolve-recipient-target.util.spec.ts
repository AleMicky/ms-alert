import {
  isRecipientTargetValid,
  resolveRecipientTarget,
} from './resolve-recipient-target.util';

describe('resolveRecipientTarget', () => {
  it('resuelve email desde to[0]', () => {
    expect(
      resolveRecipientTarget({
        channel: 'EMAIL',
        to: ['  user@test.com  '],
      }),
    ).toBe('user@test.com');
  });

  it('resuelve chatId de Telegram', () => {
    expect(
      resolveRecipientTarget({ channel: 'TELEGRAM', chatId: '123' }),
    ).toBe('123');
  });

  it('invalida destino vacío', () => {
    expect(
      isRecipientTargetValid({ channel: 'EMAIL', to: [] }),
    ).toBe(false);
  });
});
