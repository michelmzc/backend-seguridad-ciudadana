import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import  { Document } from "mongoose";

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
}

// esquema Mongoose creado a partir de la clase Camera
export const CameraSchema = SchemaFactory.createForClass(Camera);