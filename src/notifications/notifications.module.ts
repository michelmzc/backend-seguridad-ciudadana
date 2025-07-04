import { Module } from '@nestjs/common';
import { FcmModule } from './fcm/fcm.module';
import { SenderModule } from './sender/sender.module';

@Module({
  imports: [FcmModule, SenderModule],
  exports: [SenderModule]
})
export class NotificationsModule {}
