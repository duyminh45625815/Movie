import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
 
) {}



/**
 * Creates a new room.
 * @param {CreateRoomDto} roomData - Data to create the room.
 * @returns {Promise<Room>} - The newly created room.
 * 
 * Steps:
 * 1. Creates a new room instance with the provided data.
 * 2. Sets default values for `screenType` (if not provided) and `isActive`.
 * 3. Saves the new room to the database.
 */
  async createRoom(roomData: CreateRoomDto): Promise<Room> {

    const newRoom = new this.roomModel({
      name: roomData.name,
      capacity: roomData.capacity,
      screenType: roomData.screenType || '2D', 
      isActive: true,
    });
    return newRoom.save();
  }


  



/**
 * Retrieves all rooms from the database.
 * @returns {Promise<Room[]>} - List of all rooms.
 * 
 * Steps:
 * 1. Finds all rooms in the database.
 * 2. Populates the `theater` field for each room.
 */
  async findAll(): Promise<Room[]> {
    return this.roomModel.find().populate('theater').exec();
  }







  /**
 * Finds a room by its ID.
 * @param {string} id - The ID of the room to find.
 * @returns {Promise<Room>} - The found room.
 * @throws {NotFoundException} - If the room is not found.
 * 
 * Steps:
 * 1. Finds the room by ID in the database.
 * 2. If the room is not found, throws a NotFoundException.
 * 3. Returns the room.
 */
  async findOne(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }





  /**
 * Updates a room by its ID.
 * @param {string} id - The ID of the room to update.
 * @param {UpdateRoomDto} updateData - Data to update the room.
 * @returns {Promise<Room>} - The updated room.
 * @throws {NotFoundException} - If the room is not found.
 * 
 * Steps:
 * 1. Finds the room by ID and updates it with the provided data.
 * 2. If the room is not found, throws a NotFoundException.
 * 3. Returns the updated room.
 */
  async update(id: string, updateData: UpdateRoomDto): Promise<Room> {
    const updatedRoom = await this.roomModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedRoom) {
      throw new NotFoundException('Room not found');
    }
    return updatedRoom;
  }









  /**
 * Deletes a room by its ID.
 * @param {string} id - The ID of the room to delete.
 * @returns {Promise<Room>} - The deleted room.
 * @throws {NotFoundException} - If the room is not found.
 * 
 * Steps:
 * 1. Finds the room by ID and deletes it.
 * 2. If the room is not found, throws a NotFoundException.
 * 3. Returns the deleted room.
 */
  async remove(id: string): Promise<Room> {
    const deletedRoom = await this.roomModel.findByIdAndDelete(id).exec();
    if (!deletedRoom) {
      throw new NotFoundException('Không tìm thấy phòng để xóa');
    }
    return deletedRoom;
  }
}
