import { Module } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ShowtimeController } from './showtime.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Showtime, ShowtimeSchema } from './schemas/showtime.schema';
import { TheaterModule } from '../theater/theater.module';
import { RoomModule } from '../room/room.module';
import { FlimsModule } from '../flims/flims.module';

@Module({
imports: [MongooseModule.forFeature([{ name: Showtime.name, schema: ShowtimeSchema }]),
RoomModule,TheaterModule, FlimsModule],
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
  exports:[ShowtimeService]
})

export class ShowtimeModule {}
