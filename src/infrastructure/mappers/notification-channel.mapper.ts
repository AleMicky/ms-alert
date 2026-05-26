import { NotificationChannel } from 'src/domain/entities/notification-channel';
import { NotificationChannelEntity } from '../typeorm/entities/notification-channel.entity';

export class NotificationChannelMapper {
  static toDomain(entity: NotificationChannelEntity): NotificationChannel {
    const domain = new NotificationChannel();

    domain.id = entity.id;
    domain.code = entity.code;
    domain.name = entity.name;
    domain.type = entity.type;
    domain.webhookUrl = entity.webhookUrl;
    domain.description = entity.description;
    domain.active = entity.active;

    domain.createdBy = entity.createdBy;
    domain.createdAt = entity.createdAt;
    domain.updatedBy = entity.updatedBy;
    domain.updatedAt = entity.updatedAt;
    domain.deletedBy = entity.deletedBy;
    domain.deletedAt = entity.deletedAt;

    return domain;
  }

  static toPersistence(
    domain: Partial<NotificationChannel>,
  ): Partial<NotificationChannelEntity> {
    return {
      id: domain.id,
      code: domain.code,
      name: domain.name,
      type: domain.type,
      webhookUrl: domain.webhookUrl,
      description: domain.description,
      active: domain.active,
    };
  }
}
