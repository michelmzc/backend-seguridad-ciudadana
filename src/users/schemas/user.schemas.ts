import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Camera } from 'src/cameras/schemas/camera.schema';

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

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }] })
    reports: Report[];

    /*
    @Prop({
        type: {
            lat : { type: Number, required: true },
            lon : { type: Number, required: true }
        },
        required: true,
    })
    location: { lat: number; lon: number };
    */

    @Prop({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
        default: [-73.1330, -40.5749], // Coordenadas del centro de Osorno
    },
    })
    location: {
    type: 'Point';
    coordinates: [number, number];
    };

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ location: '2dsphere' });