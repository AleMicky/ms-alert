import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import {
  NotificationChannelEntity,
  SeverityLevelEntity,
  ClientSystemEntity,
  ClientSystemTokenEntity,
  EventEntity,
  AlertRuleEntity,
  AlertEntity,
  AlertNotificationEntity,
} from './infrastructure/typeorm/entities';
// Services
import {
  NotificationChannelsService,
  SeverityLevelService,
  ClientSystemService,
  ClientSystemTokenService,
  EventService,
  AlertRuleService,
  AlertService,
  AlertNotificationService,
  NotificationService,
} from './app/services';
// Repositories
import {
  NotificationChannelRepository,
  SeverityLevelRepository,
  ClientSystemRepository,
  ClientSystemTokenRepository,
  EventRepository,
  AlertRuleRepository,
  AlertRepository,
  AlertNotificationRepository,
} from './domain/repositories';
// Controllers
import {
  SeverityLevelController,
  NotificationChannelsController,
  ClientSystemController,
  ClientSystemTokenController,
  EventController,
  AlertRuleController,
  AlertController,
  AlertNotificationController,
  TestN8nController,
} from './presentation/controllers';
// Repositories
import {
  SeverityLevelTypeormRepository,
  NotificationChannelTypeormRepository,
  ClientSystemTypeormRepository,
  ClientSystemTokenTypeormRepository,
  EventTypeormRepository,
  AlertRuleTypeormRepository,
  AlertTypeormRepository,
  AlertNotificationTypeormRepository,
} from './infrastructure/repositories';
import { N8nClient } from './infrastructure/integrations/n8n/n8n.client';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationChannelEntity,
      SeverityLevelEntity,
      ClientSystemEntity,
      ClientSystemTokenEntity,
      EventEntity,
      AlertRuleEntity,
      AlertEntity,
      AlertNotificationEntity,
    ]),
  ],
  controllers: [
    NotificationChannelsController,
    SeverityLevelController,
    ClientSystemController,
    ClientSystemTokenController,
    EventController,
    AlertRuleController,
    AlertController,
    AlertNotificationController,
    TestN8nController,
  ],
  providers: [
    N8nClient,
    NotificationService,
    NotificationChannelsService,
    SeverityLevelService,
    ClientSystemService,
    ClientSystemTokenService,
    EventService,
    AlertRuleService,
    AlertService,
    AlertNotificationService,
    {
      provide: NotificationChannelRepository,
      useClass: NotificationChannelTypeormRepository,
    },
    {
      provide: SeverityLevelRepository,
      useClass: SeverityLevelTypeormRepository,
    },
    {
      provide: ClientSystemRepository,
      useClass: ClientSystemTypeormRepository,
    },
    {
      provide: ClientSystemTokenRepository,
      useClass: ClientSystemTokenTypeormRepository,
    },
    {
      provide: EventRepository,
      useClass: EventTypeormRepository,
    },
    {
      provide: AlertRuleRepository,
      useClass: AlertRuleTypeormRepository,
    },
    {
      provide: AlertRepository,
      useClass: AlertTypeormRepository,
    },
    {
      provide: AlertNotificationRepository,
      useClass: AlertNotificationTypeormRepository,
    },
  ],
})
export class MsAlertsModule {}
