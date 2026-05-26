import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  SWAGGER_DATE,
  SWAGGER_UUID,
  SWAGGER_UUID_2,
} from 'src/config/swagger/constants/swagger-examples';

export class CreateEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: SWAGGER_UUID,
    description: 'Sistema que originó el evento',
  })
  @IsUUID()
  clientSystemId: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    example: SWAGGER_UUID_2,
    description: 'Nivel de severidad asignado',
  })
  @IsUUID()
  severityLevelId: string;

  @ApiProperty({ type: String, example: 'EVT_PAGO_RECHAZADO' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ type: String, example: 'PAYMENT_REJECTED' })
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @ApiProperty({ type: String, example: 'Pago rechazado' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    example: 'El pago con referencia ABC123 fue rechazado',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: { orderId: 'ORD-99', amount: 1500.5 },
    description: 'Datos adicionales del evento en JSON',
  })
  @IsOptional()
  @IsObject()
  payloadJson?: Record<string, unknown>;

  @ApiPropertyOptional({ type: String, example: 'PENDING', default: 'PENDING' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: SWAGGER_DATE,
    description: 'Fecha en que ocurrió el evento (ISO 8601)',
  })
  @IsDateString()
  @IsOptional()
  eventDate: string;

  @ApiPropertyOptional({ type: Boolean, example: true, default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
