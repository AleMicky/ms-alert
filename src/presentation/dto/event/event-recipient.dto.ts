import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EventRecipientDto {
  @ApiProperty({ example: 'EMAIL', description: 'Código del canal de notificación' })
  @IsString()
  @IsNotEmpty()
  channel: string;

  @ApiPropertyOptional({ example: 'Solicitud aprobada' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiPropertyOptional({ example: 'La solicitud fue aprobada.' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    example: ['usuario@email.com'],
    description: 'Destinatarios para canal EMAIL',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  to?: string[];

  @ApiPropertyOptional({
    example: '123456789',
    description: 'Chat ID para canal TELEGRAM',
  })
  @IsOptional()
  @IsString()
  chatId?: string;

  @ApiPropertyOptional({
    description: 'Asistente para canal GOOGLE_CALENDAR',
  })
  @IsOptional()
  @IsString()
  attendee?: string;

  @ApiPropertyOptional({ description: 'Destino genérico' })
  @IsOptional()
  @IsString()
  target?: string;
}

export class EventPayloadDto {
  @ApiPropertyOptional({
    type: [EventRecipientDto],
    description: 'Lista de destinatarios a notificar',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventRecipientDto)
  recipients?: EventRecipientDto[];
}
