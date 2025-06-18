import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SenderService } from './sender.service';
import { Notification  } from './schema/notifications.schema';

@Controller('notifications')
@ApiTags('Notificaciones')
export class SenderController {
  constructor(private readonly senderService: SenderService) {}

  @Get()
  async getAll(): Promise<Notification[]> {
    return this.senderService.findAll();
  }

  @Post('send-test')
  @ApiOperation({ summary: 'Test de notificaciones (necesita token de usuario)'})
  async sendTestNotification(@Body() body: { token: string }) {
    //console.log(body)
    return this.senderService.sendNotificationToToken(
      body.token,
      'Título de prueba',
      'Este es el cuerpo de la notificación de prueba',
    );
  }
}
