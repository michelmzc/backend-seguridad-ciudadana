import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Types } from 'mongoose'; // importamos desde mongoose
import { Camera, CameraSchema } from 'src/cameras/schemas/camera.schema';

// definición del tipo de documento usuario
export type UserDocument = User & Document;


@Schema()
export class User {
    @Prop()
    name: string;

    @Prop({ required: true, unique: true })
    phoneNumber: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    country: string;

    // relación con las cámaras 
    //  cada usuario tiene un array de ObjectId[] apuntando a Camera
    //  se usa default: [] para evitar valores undefined
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Camera' }] })
    cameras: Camera[];
}

export const UserSchema = SchemaFactory.createForClass(User);