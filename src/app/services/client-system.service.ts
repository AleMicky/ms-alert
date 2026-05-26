import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/core/base.service';
import { ClientSystem } from 'src/domain/entities/client-system';
import { ClientSystemRepository } from 'src/domain/repositories/client-system.repository';
import { CreateClientSystemWithDetailDto } from 'src/presentation/dto/client-system/create-client-system-with-detail.dto';
import { ClientSystemTokenService } from './client-system-token.service';

@Injectable()
export class ClientSystemService extends BaseService<ClientSystem> {
  constructor(
    private readonly clientSystemRepository: ClientSystemRepository,
    private readonly clientSystemTokenService: ClientSystemTokenService,
  ) {
    super(clientSystemRepository);
  }

  findByCode(code: string) {
    return this.clientSystemRepository.findByCode(code);
  }

  findByIdWithTokens(id: string) {
    return this.clientSystemRepository.findByIdWithTokens(id);
  }

  async createWithDetail(
    dto: CreateClientSystemWithDetailDto,
  ): Promise<ClientSystem> {
    const { initialToken, ...systemData } = dto;

    const clientSystem = await this.clientSystemRepository.create(systemData);

    if (initialToken) {
      const token = await this.clientSystemTokenService.create({
        clientSystemId: clientSystem.id,
        description: initialToken.description,
        expiresAt: initialToken.expiresAt,
      });

      return {
        ...clientSystem,
        tokens: [token],
      };
    }

    return clientSystem;
  }
}
