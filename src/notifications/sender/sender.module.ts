import { Module } from '@nestjs/common';
import { SenderService } from './sender.service';
import { FcmModule } from '../fcm/fcm.module';
import { SenderController } from './sender.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schema/notifications.schema';
import { User, UserSchema } from 'src/users/schemas/user.schemas';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    FcmModule,
    MongooseModule.forFeature([
      {name: Notification.name, schema: NotificationSchema}
    ]),
     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
     UsersModule

  ],
  controllers: [SenderController],
  providers: [SenderService],
  exports: [SenderService],
})
export class SenderModule {}
