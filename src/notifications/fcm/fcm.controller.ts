import { Controller, Post, Req, Body, Delete } from '@nestjs/common';
import { FcmService } from './fcm.service';

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Post('register')
  async register(@Req() req: Request, @Body() body: any) {
    console.log('FCM Register recibido:', body);

    console.log('>> req.body:', req.body)
    console.log('>> Headers:', req.headers)

    if (!body || !body.userId || !body.token ){
      throw new Error('Datos FCM incompletos');
    }

    return this.fcmService.registerToken(body.userId, body.token, body.platform);
  }

  @Delete('unregister')
  async unregister(@Body() body: { token: string }) {
    return this.fcmService.deleteToken(body.token);
  }
}
