import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { CreateRoomDto } from '../room/dto/create-room.dto';

@Controller('theaters')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @Post('add-theaters')
  create(@Body() createTheaterDto: CreateTheaterDto) {
    return this.theaterService.create(createTheaterDto);
  }

  @Post('add-room/:id') 
  addRoomToTheater(@Param('id') threadId: string, @Body() createRoomDto:CreateRoomDto) {
    return this.theaterService.addRoomToTheater(threadId, createRoomDto);
  }

  @Get('findtheater')
  findAll() {
    return this.theaterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.theaterService.findTheaterByID(id);
  }
  
  @Patch('update-theater/:id')
  update(@Param('id') id: string, @Body() updateTheaterDto: UpdateTheaterDto) {
    return this.theaterService.update(id, updateTheaterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theaterService.remove(id);
  }
}
