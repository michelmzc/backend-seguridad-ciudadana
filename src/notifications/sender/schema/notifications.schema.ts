import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
    @Prop({ required: true })
    type: 'emergencia' | 'preventiva';

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    message: string; 

    @Prop()
    timestamp: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);