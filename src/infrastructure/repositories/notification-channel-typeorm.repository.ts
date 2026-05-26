import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenericRepository } from 'src/shared/core/generic.repository';
import { NotificationChannelRepository } from 'src/domain/repositories/notification-channel.repository';
import { NotificationChannelType } from 'src/domain/enums/notification-channel-type.enum';
import { NotificationChannelEntity } from '../typeorm/entities/notification-channel.entity';

@Injectable()
export class NotificationChannelTypeormRepository
  extends GenericRepository<NotificationChannelEntity>
  implements NotificationChannelRepository
{
  constructor(
    @InjectRepository(NotificationChannelEntity)
    repository: Repository<NotificationChannelEntity>,
  ) {
    super(repository);
  }

  findByCode(code: string) {
    return this.repository.findOne({
      where: { code },
    });
  }

  findActiveByType(type: NotificationChannelType) {
    return this.repository.find({
      where: {
        type,
        active: true,
      },
    });
  }
}
