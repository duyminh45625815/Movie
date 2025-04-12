import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { ShowtimeModule } from '../showtime/showtime.module';
import { FlimsModule } from '../flims/flims.module';
import { FoodModule } from '../food/food.module';
import { UserModule } from '../user/user.module';

@Module({
imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),ShowtimeModule,FlimsModule,FoodModule,UserModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports:[BookingService]
})
export class BookingModule {}
