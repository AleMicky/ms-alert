import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';

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
    type: 'object',
    additionalProperties: true,
    example: {
      requestId: 'SOL-001',
      approvedBy: 'Juan Pérez',
      channels: ['EMAIL', 'TELEGRAM'],
      approver: {
        email: 'faviana@email.com',
        telegramChatId: '123456789',
      },
    },
  })
  @IsOptional()
  @IsObject()
  payloadJson?: Record<string, unknown>;

  @ApiPropertyOptional({
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}