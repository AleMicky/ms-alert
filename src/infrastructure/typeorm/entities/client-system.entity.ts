import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClientSystemTokenEntity } from './client-system-token.entity';
import { BaseAuditColumns } from 'src/shared/core/base-audit-columns';

@Entity({ name: 'tclient_systems' })
export class ClientSystemEntity extends BaseAuditColumns {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    default: true,
  })
  active: boolean;

  @OneToMany(
    () => ClientSystemTokenEntity,
    (clientSystemToken) => clientSystemToken.clientSystem,
  )
  tokens?: ClientSystemTokenEntity[];
}
