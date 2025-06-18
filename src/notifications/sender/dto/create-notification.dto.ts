// src/notifications/dto/create-notification.dto.ts
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsEnum(['emergencia', 'preventiva'])
  type: 'emergencia' | 'preventiva';

  @IsString()
  title: string;

  @IsString()
  message: string;
}
