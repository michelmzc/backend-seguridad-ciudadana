import { Module } from '@nestjs/common';
import { SenderService } from './sender.service';
import { FcmModule } from '../fcm/fcm.module';
import { SenderController } from './sender.controller';

@Module({
  imports: [FcmModule],
  controllers: [SenderController],
  providers: [SenderService],
  exports: [SenderService],
})
export class SenderModule {}
