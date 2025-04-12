import {  BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Theater } from './schemas/theater.schema';
import { Model, Types } from 'mongoose';
import { RoomService } from '../room/room.service';
import { CreateRoomDto } from '../room/dto/create-room.dto';
import { Room } from '../room/schemas/room.schema';
@Injectable()
export class TheaterService {
  constructor(
  @InjectModel(Theater.name) private theaterModel: Model<Theater>,
  private  roomService: RoomService
) {}


/**
 * 
 * @param theaterData 
 * Step1: Kiểm tra xem rạp đã tồn tại chưa
 * Step2: Nếu rạp đã tồn tại thì throw BadRequestException
 * Step3: Tạo rạp mới và lưu vào database
 * Step4: Trả về rạp vừa tạo
 * @returns createdTheater
 */
async create(theaterData: CreateTheaterDto): Promise<Theater> {
  const checkAddress = await this.theaterModel.findOne({ address: theaterData.address }).exec();
  if (checkAddress) {
    throw new ConflictException(`Địa chỉ ${theaterData.address} đã tồn tại ở rạp ${checkAddress.name}`);
  }
  const checkName = await this.theaterModel.findOne({ name: theaterData.name }).exec();
  if (checkName) {
    throw new ConflictException(`Rạp ${theaterData.name} đã tồn tại`);
  }
  const createdTheater = await this.theaterModel.create({
          name: theaterData.name,
          address: theaterData.address,
          isActive: true,
  })
 return createdTheater;
}



/**
 * 
 * @param theaterId 
 * @param createRoomDto
 * Step 1 : Find by ID docbuments theater
 * Step 2 : if response !theater throw BadRequest
 * Step 3 :   
 * @returns 
 */
async addRoomToTheater(theaterId: string , createRoomDto: CreateRoomDto): Promise<{message:string}> {
  const theater = await this.theaterModel.findById(theaterId).exec();
  if (!theater) {
    throw new BadRequestException('Threater not exist');
  }
  const populatedTheater = await theater.populate<{ rooms: Room[] }>('rooms');
  const roomExists = populatedTheater.rooms.some((room: Room) => room.name === createRoomDto.name);
  if (roomExists) {
    throw new ConflictException(`Room "${createRoomDto.name}" already existed in ${theater.name}`);
  }
  const newRoom = await this.roomService.createRoom(createRoomDto);
  populatedTheater.rooms?.push(newRoom.id);
  await populatedTheater.save();
  return { message: `Room already created in ${theater.name}` };
}
async findAll(): Promise<Theater[]> {
  return this.theaterModel.find().populate('rooms').exec();
}




async findTheaterByID(id:string): Promise<Theater|null> {
  return this.theaterModel.findById(id).populate('rooms').exec() ;
}


/**
 * @param id 
 * @param updateData 
 * Step1: Kiểm tra xem rạp đã tồn tại chưa
 * Step2: Nếu rạp đã tồn tại thì throw BadRequestException  
 * Step3: Update rạp
 * Step4: Trả về rạp vừa update
 * @returns 
 */
async update(id: string, updateData: UpdateTheaterDto): Promise<Theater|null> {
  const existingTheater = await this.theaterModel.findOne({ name: updateData.name }).exec();
  if (existingTheater && existingTheater.id !== id) {
    throw new BadRequestException('Tên rạp đã tồn tại');
  }
  return this.theaterModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
}

async remove(id: string): Promise<Theater|null> {
  return this.theaterModel.findByIdAndDelete(id).exec();
}

}
