import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EventPayloadDto } from './event-recipient.dto';

export class CreateEventDto {
  @ApiProperty({
    example: 'GESTION_VEHICULAR',
    description: 'Código del sistema cliente',
  })
  @IsString()
  @IsNotEmpty()
  clientSystemCode: string;

  @ApiProperty({
    example: 'VEHICLE_REQUEST_APPROVED',
    description: 'Código del tipo de evento',
  })
  @IsString()
  @IsNotEmpty()
  eventTypeCode: string;

  @ApiProperty({
    example: 'Solicitud aprobada',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'La solicitud SOL-001 fue aprobada.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    type: EventPayloadDto,
    example: {
      requestId: 'SOL-001',
      approvedBy: 'Juan Pérez',
      recipients: [
        {
          channel: 'EMAIL',
          to: ['usuario@email.com'],
          subject: 'Solicitud aprobada',
          message: 'La solicitud SOL-001 fue aprobada.',
        },
        {
          channel: 'TELEGRAM',
          chatId: '123456789',
          message: 'Solicitud SOL-001 aprobada',
        },
      ],
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => EventPayloadDto)
  payloadJson?: EventPayloadDto;

  @ApiPropertyOptional({
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
