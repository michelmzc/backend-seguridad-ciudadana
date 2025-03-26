import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import  mongoose, { Document, Types } from "mongoose";
import { User } from 'src/users/schemas/user.schemas';

// definición del tipo de un documento libro
export type CameraDocument = Camera & Document;

@Schema() // decorador para crear una colección MongoDB para la clase
export class Camera {
    @Prop() // decorador para añadir un campo a la colección
    name: string;

    @Prop()
    stream_url: string;

    @Prop()
    serial_number: string;

    @Prop([String]) // indicación de tipo no primitivos para prueba
    keywords: string[];

    // dueño(s) de las cámaras (puede ser null si no está asignada)
    @Prop({ type: Types.ObjectId, ref: 'User', default: null})
    owner: Types.ObjectId | User;
}

// esquema Mongoose creado a partir de la clase Camera
export const CameraSchema = SchemaFactory.createForClass(Camera);