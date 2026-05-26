import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { SWAGGER_DATE_FUTURE } from 'src/config/swagger/constants/swagger-examples';
import { CreateClientSystemDto } from './create-client-system.dto';

export class InitialClientSystemTokenDto {
  @ApiPropertyOptional({
    type: String,
    maxLength: 300,
    example: 'Token inicial de integración',
    description: 'Descripción del token generado',
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    example: SWAGGER_DATE_FUTURE,
    description: 'Fecha de expiración del token (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class CreateClientSystemWithDetailDto extends CreateClientSystemDto {
  @ApiPropertyOptional({
    type: InitialClientSystemTokenDto,
    description: 'Token opcional creado junto con el sistema',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => InitialClientSystemTokenDto)
  initialToken?: InitialClientSystemTokenDto;
}
