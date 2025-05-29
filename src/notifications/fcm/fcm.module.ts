import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FcmService } from './fcm.service';
import { FcmController } from './fcm.controller';
import { FcmToken, FcmTokenSchema } from './fcm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FcmToken.name, schema: FcmTokenSchema }]),
  ],
  providers: [FcmService],
  controllers: [FcmController],
  exports: [FcmService], // para usarlo en el sender
})
export class FcmModule {}
