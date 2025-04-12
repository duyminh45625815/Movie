
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Theater extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Room', required: false, default: [] })
  rooms?: mongoose.Types.ObjectId[] ;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;  
}
export const TheaterSchema = SchemaFactory.createForClass(Theater);
