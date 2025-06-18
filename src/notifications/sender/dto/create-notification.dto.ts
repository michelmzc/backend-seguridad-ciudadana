// src/notifications/dto/create-notification.dto.ts
import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateNotificationDto {
  @IsEnum(['emergencia', 'preventiva'])
  type: 'emergencia' | 'preventiva';

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsDateString()
  timestamp?: string; // ISO 8601 string (se convierte a Date en el backend)
}
