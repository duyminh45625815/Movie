import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Controller('showtime')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Post('addShowtime')
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return this.showtimeService.create(createShowtimeDto);
  }

  @Get('findAlltime')
  findAll() {
    return this.showtimeService.findAll();
  }

  @Get('FindOnetime/:id')
  findOne(@Param('id') id: string) {
    return this.showtimeService.findOne(id);
  }

  @Patch('updateStatus')
  updateStatus(@Body()id:string){
    return this.showtimeService.updateStatus(id);
  }


  @Patch('updateTime/:id')
  update(@Param('id') id: string, @Body() updateShowtimeDto: UpdateShowtimeDto) {
    return this.showtimeService.update(id, updateShowtimeDto);
  }

  @Delete('deleteTime/:id')
  remove(@Param('id') id: string) {
    return this.showtimeService.remove(id);
  }
}
