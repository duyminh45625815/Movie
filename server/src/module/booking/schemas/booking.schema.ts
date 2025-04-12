import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) 
export class Booking extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Showtime', required: true })
    showtime: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user:Types.ObjectId

    @Prop({type:Array,required:true ,default:[]})
    seats:string[]


    @Prop({
        type: [{
            food: { type: Types.ObjectId, ref: 'Food', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }],
        required: true,
        default: []
    })
    combo: { food: Types.ObjectId, quantity: number }[];

    @Prop({required:true})
    totalPrice:number

    @Prop({ type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending' })
    status: string;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);
