import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SenderService } from './sender.service';

@Controller('notifications')
@ApiTags('Notificaciones')
export class SenderController {
  constructor(private readonly senderService: SenderService) {}

  @Post('send-test')
  @ApiOperation({ summary: 'Test de notificaciones (necesita token de usuario)'})
  async sendTestNotification(@Body() body: { token: string }) {
    return this.senderService.sendNotificationToToken(
      body.token,
      'Título de prueba',
      'Este es el cuerpo de la notificación de prueba',
    );
  }
}
