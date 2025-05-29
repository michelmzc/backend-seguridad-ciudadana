import { Controller, Post, Body } from '@nestjs/common';
import { SenderService } from './sender.service';

@Controller('notifications')
export class SenderController {
  constructor(private readonly senderService: SenderService) {}

  @Post('send-test')
  async sendTestNotification(@Body() body: { token: string }) {
    return this.senderService.sendNotificationToToken(
      body.token,
      'Título de prueba',
      'Este es el cuerpo de la notificación de prueba',
    );
  }
}
