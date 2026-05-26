import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AlertEntity } from './alert.entity';
import { NotificationChannelEntity } from './notification-channel.entity';

@Entity('talert_notifications')
export class AlertNotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AlertEntity)
  @JoinColumn({
    name: 'alert_id',
  })
  alert: AlertEntity;

  @ManyToOne(() => NotificationChannelEntity)
  @JoinColumn({
    name: 'notification_channel_id',
  })
  notificationChannel: NotificationChannelEntity;

  @Column({
    length: 50,
    default: 'PENDING',
  })
  status: string;

  @Column({
    name: 'sent_at',
    type: 'timestamp',
    nullable: true,
  })
  sentAt?: Date;

  @Column({
    nullable: true,
    type: 'text',
  })
  response?: string;
}
