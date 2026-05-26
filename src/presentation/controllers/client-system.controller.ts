import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { BaseController } from 'src/shared/core/base.controller';
import { ApiCrudDoc } from 'src/config/swagger/crud';
import { ClientSystem } from 'src/domain/entities/client-system';
import { ClientSystemService } from 'src/app/services/client-system.service';
import { ClientSystemResponseSchema } from '../schemas';
import {
  CreateClientSystemDto,
  UpdateClientSystemDto,
} from '../dto/client-system';
import { CreateClientSystemWithDetailDto } from '../dto/client-system/create-client-system-with-detail.dto';

@Controller('client-systems')
@ApiCrudDoc({
  tag: 'Sistemas cliente',
  createDto: CreateClientSystemDto,
  updateDto: UpdateClientSystemDto,
  responseDto: ClientSystemResponseSchema,
})
export class ClientSystemController extends BaseController<
  ClientSystem,
  CreateClientSystemDto,
  UpdateClientSystemDto
> {
  constructor(private readonly clientSystemService: ClientSystemService) {
    super(clientSystemService);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Obtener sistema cliente por código' })
  @ApiParam({ name: 'code', example: 'SIS_FIN' })
  @ApiOkResponse({ type: ClientSystemResponseSchema })
  findByCode(
    @Param('code')
    code: string,
  ) {
    return this.clientSystemService.findByCode(code);
  }

  @Get(':id/detail')
  @ApiOperation({ summary: 'Obtener sistema con tokens asociados' })
  @ApiParam({
    name: 'id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({ type: ClientSystemResponseSchema })
  findByIdWithTokens(
    @Param('id')
    id: string,
  ) {
    return this.clientSystemService.findByIdWithTokens(id);
  }

  @Post('with-detail')
  @ApiOperation({ summary: 'Crear sistema cliente con token inicial opcional' })
  @ApiBody({ type: CreateClientSystemWithDetailDto })
  @ApiOkResponse({ type: ClientSystemResponseSchema })
  createWithDetail(@Body() dto: CreateClientSystemWithDetailDto) {
    return this.clientSystemService.createWithDetail(dto);
  }
}
