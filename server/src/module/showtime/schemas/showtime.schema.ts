import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
interface Seat {
  seatNumber: string; 
  status?: 'available' | 'booked' | 'reserved';
}
@Schema({ timestamps: true }) 
export class Showtime extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Flim', required: true })
  films: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Theater', required: true })
  theater: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
   rooms: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;
 
  @Prop({ type: [{ 
    seatNumber: { type: String, required: true },
    status: { type: String, enum: ['available', 'booked', 'reserved'], default: 'available' }
  }], default: [] })
  seats: [Seat]; 

  @Prop({required:true})
  dateAction: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({required:true})
  price: string;

  @Prop({Type:String , enum:['active','closed'] , default:'active'})
  status?:string;
}

export const ShowtimeSchema = SchemaFactory.createForClass(Showtime);
