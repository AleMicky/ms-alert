import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { BaseController } from 'src/shared/core/base.controller';
import { ApiCrudDoc } from 'src/config/swagger/crud';
import { ClientSystemToken } from 'src/domain/entities/client-system-token';
import { ClientSystemTokenService } from 'src/app/services/client-system-token.service';
import { ClientSystemTokenResponseSchema } from '../schemas';
import {
  CreateClientSystemTokenDto,
  UpdateClientSystemTokenDto,
} from '../dto/client-system-token';

@Controller('client-system-tokens')
@ApiCrudDoc({
  tag: 'Tokens',
  createDto: CreateClientSystemTokenDto,
  updateDto: UpdateClientSystemTokenDto,
  responseDto: ClientSystemTokenResponseSchema,
})
export class ClientSystemTokenController extends BaseController<
  ClientSystemToken,
  CreateClientSystemTokenDto,
  UpdateClientSystemTokenDto
> {
  constructor(
    private readonly clientSystemTokenService: ClientSystemTokenService,
  ) {
    super(clientSystemTokenService);
  }

  @Get('token/:token')
  @ApiOperation({ summary: 'Obtener token por su valor' })
  @ApiParam({ name: 'token', example: 'a1b2c3d4e5f6...' })
  @ApiOkResponse({ type: ClientSystemTokenResponseSchema })
  findByToken(
    @Param('token')
    token: string,
  ) {
    return this.clientSystemTokenService.findByToken(token);
  }

  @Get('client-system/:clientSystemId')
  @ApiOperation({ summary: 'Listar tokens por sistema cliente' })
  @ApiParam({
    name: 'clientSystemId',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({ type: [ClientSystemTokenResponseSchema] })
  findByClientSystemId(
    @Param('clientSystemId')
    clientSystemId: string,
  ) {
    return this.clientSystemTokenService.findByClientSystemId(clientSystemId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear token de sistema cliente' })
  @ApiBody({ type: CreateClientSystemTokenDto })
  @ApiOkResponse({ type: ClientSystemTokenResponseSchema })
  create(@Body() dto: CreateClientSystemTokenDto): Promise<ClientSystemToken> {
    return this.clientSystemTokenService.create(dto);
  }
}
