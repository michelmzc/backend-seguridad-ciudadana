import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class FcmToken extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;
    
    @Prop({ required: true, unique: true })
    token: string;

    @Prop({ default: 'android' }) // o 'ios', según el caso
    platform: string;

    @Prop({ default: true }) // o 'ios', según el caso
    active: boolean;


}

export const FcmTokenSchema = SchemaFactory.createForClass(FcmToken);
