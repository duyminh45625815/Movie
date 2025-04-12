import { Module } from '@nestjs/common';
import { FlimsService,FILM_TOKEN } from './flims.service';
import { FlimsController } from './flims.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsImplementation } from './responsitories/responsitory-sericeFilms';
import { Flim, FlimSchema } from './schemas/flim.schema';

@Module({
   imports: [MongooseModule.forFeature([{ name: Flim.name, schema: FlimSchema }])],
  controllers: [FlimsController],
  providers: [
    FlimsService,
    {
      provide: FILM_TOKEN ,
      useClass: FilmsImplementation
    }
     
],
  exports: [FlimsService],
})
export class FlimsModule {}
