import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; // importamos desde mongoose
import { Camera, CameraSchema } from 'src/cameras/schemas/camera.schema';

// definición del tipo de documento usuario
export type UserDocument = User & Document;


@Schema()
export class User {
    @Prop()
    _id: string; // gestión del id desde el código, en lugar de mongo

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    country: string;

    // camaras que posee el usuario 
    @Prop([CameraSchema]) // configuramos el tipo porque no es tipo primitivo
    cameras: Camera[]; // 
}

export const UserSchema = SchemaFactory.createForClass(User);