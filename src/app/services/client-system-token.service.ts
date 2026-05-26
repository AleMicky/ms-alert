import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/core/base.service';
import { ClientSystemToken } from 'src/domain/entities/client-system-token';
import { ClientSystemTokenRepository } from 'src/domain/repositories/client-system-token.repository';
import { CreateClientSystemTokenDto } from 'src/presentation/dto/client-system-token';
import { generateSecureToken } from 'src/shared/utils/token-generator.util';

@Injectable()
export class ClientSystemTokenService extends BaseService<ClientSystemToken> {
  constructor(
    private readonly clientSystemTokenRepository: ClientSystemTokenRepository,
  ) {
    super(clientSystemTokenRepository);
  }

  findByToken(token: string) {
    return this.clientSystemTokenRepository.findByToken(token);
  }

  findByClientSystemId(clientSystemId: string) {
    return this.clientSystemTokenRepository.findByClientSystemId(
      clientSystemId,
    );
  }

  async create(
    dto: CreateClientSystemTokenDto | Partial<ClientSystemToken>,
  ): Promise<ClientSystemToken> {
    const clientSystemId =
      'clientSystemId' in dto ? dto.clientSystemId : dto.clientSystem?.id;

    if (!clientSystemId) {
      throw new BadRequestException('clientSystemId es requerido');
    }

    return this.clientSystemTokenRepository.create({
      token: generateSecureToken(),
      description: dto.description,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      active: dto.active ?? true,
      clientSystem: { id: clientSystemId },
    } as Partial<ClientSystemToken>);
  }
}
