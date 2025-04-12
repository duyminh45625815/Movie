
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Food extends Document {
    @Prop({required:true})
    titleFood: string
    
    @Prop({required:true})
    details:string

    @Prop({required:true})
    price:string

    @Prop({required:true})
    imageFood:string

    @Prop({default:"pending"})
    statusFood?:string
}
export const FoodSchema = SchemaFactory.createForClass(Food);