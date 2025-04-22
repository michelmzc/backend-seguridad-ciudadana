import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types} from 'mongoose';
import { User } from 'src/users/schemas/user.schemas';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
    @Prop({ required: true })
    text: string;

    @Prop({ required: true })
    category: string;

    @Prop({
        type: {
            lat : { type: Number, required: true },
            lon : { type: Number, required: true }
        },
        required: true,
    })
    location: { lat: number; lon: number };
}

export const ReportSchema = SchemaFactory.createForClass(Report); 