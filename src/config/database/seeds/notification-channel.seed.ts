import { DataSource } from 'typeorm';

import { NotificationChannelEntity } from 'src/infrastructure/typeorm/entities/notification-channel.entity';
import { NotificationChannelType } from 'src/domain/enums/notification-channel-type.enum';

export async function notificationChannelSeed(dataSource: DataSource) {
  const repository = dataSource.getRepository(NotificationChannelEntity);

  const exists = await repository.count();

  if (exists > 0) {
    console.log('Notification channels already seeded');

    return;
  }

  await repository.save([
    {
      code: 'TELEGRAM_ALERTS',
      name: 'Telegram Alerts',
      type: NotificationChannelType.TELEGRAM,
      webhookUrl: 'http://localhost:5678/webhook/telegram',
      active: true,
    },
    {
      code: 'EMAIL_ALERTS',
      name: 'Email Alerts',
      type: NotificationChannelType.EMAIL,
      webhookUrl: 'http://localhost:5678/webhook/email',
      active: true,
    },
  ]);

  console.log('Notification channels seeded');
}
