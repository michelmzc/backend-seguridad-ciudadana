import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; // importamos desde mongoose

// definición del tipo de documento usuario
export type UserDocument = User & Document;


@Schema()
export class User {
    @Prop()
    _id: string; // gestión del id desde el código, saltamos mongo

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);