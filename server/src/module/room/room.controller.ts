import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';


@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('addRoom')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @Get('getAllRoom/:id')
  findAll() {
    return this.roomService.findAll();
  }

  @Get('getRoom:id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch('UpdateRoom/:id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }
  @Delete('deleteroom/:id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
