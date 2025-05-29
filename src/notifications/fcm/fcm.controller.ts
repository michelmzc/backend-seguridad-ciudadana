import { Controller, Post, Body, Delete } from '@nestjs/common';
import { FcmService } from './fcm.service';

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Post('register')
  async register(@Body() body: { userId: string; token: string; platform?: string }) {
    return this.fcmService.registerToken(body.userId, body.token, body.platform);
  }

  @Delete('unregister')
  async unregister(@Body() body: { token: string }) {
    return this.fcmService.deleteToken(body.token);
  }
}
