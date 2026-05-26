import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from 'src/shared/core/generic.repository';
import { ClientSystemTokenRepository } from 'src/domain/repositories/client-system-token.repository';
import { ClientSystemTokenEntity } from '../typeorm/entities/client-system-token.entity';

@Injectable()
export class ClientSystemTokenTypeormRepository
  extends GenericRepository<ClientSystemTokenEntity>
  implements ClientSystemTokenRepository
{
  constructor(
    @InjectRepository(ClientSystemTokenEntity)
    repository: Repository<ClientSystemTokenEntity>,
  ) {
    super(repository);
  }

  findByToken(token: string) {
    return this.repository.findOne({
      where: { token },
      relations: {
        clientSystem: true,
      },
    });
  }

  findByClientSystemId(clientSystemId: string) {
    return this.repository.find({
      where: {
        clientSystem: { id: clientSystemId },
      },
      relations: {
        clientSystem: true,
      },
      order: { createdAt: 'DESC' },
    });
  }
}
