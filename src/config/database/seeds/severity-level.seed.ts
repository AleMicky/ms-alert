import { DataSource } from 'typeorm';

import { SeverityLevelEntity } from 'src/infrastructure/typeorm/entities/severity-level.entity';

export async function severityLevelSeed(dataSource: DataSource) {
  const repository = dataSource.getRepository(SeverityLevelEntity);

  const exists = await repository.count();

  if (exists > 0) {
    console.log('Severity levels already seeded');

    return;
  }

  await repository.save([
    {
      code: 'LOW',
      name: 'Low',
      priority: 1,
      attentionTimeMinutes: 1440,
      active: true,
    },
    {
      code: 'MEDIUM',
      name: 'Medium',
      priority: 2,
      attentionTimeMinutes: 240,
      active: true,
    },
    {
      code: 'HIGH',
      name: 'High',
      priority: 3,
      attentionTimeMinutes: 60,
      active: true,
    },
    {
      code: 'CRITICAL',
      name: 'Critical',
      priority: 4,
      attentionTimeMinutes: 15,
      active: true,
    },
  ]);

  console.log('Severity levels seeded');
}
