import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    message: string; 

    @Prop({ enum:['enum', 'preventiva'], default: 'preventiva' })
    type: 'emergencia' | 'preventiva';
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);