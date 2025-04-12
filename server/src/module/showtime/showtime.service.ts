import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Showtime } from './schemas/showtime.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FlimsService } from '../flims/flims.service';
import { Model } from 'mongoose';
import { TheaterService } from '../theater/theater.service';
import { RoomService } from '../room/room.service';
@Injectable()
export class ShowtimeService {
  constructor(@InjectModel(Showtime.name)
  private showtimeModel: Model<Showtime>,
    private roomService: RoomService,
    private flimService: FlimsService,
    private theaterService : TheaterService
  ) { }



/**
 * Creates a new showtime.
 * @param {CreateShowtimeDto} createShowtimeDto - Data to create the showtime.
 * @returns {Promise<{message: string}>} - Success message.
 * @throws {ConflictException} - If the showtime overlaps with existing showtimes or if the price is missing.
 * @throws {NotFoundException} - If the room, film, or theater does not exist.
 * 
 * Steps:
 * 1. Check if the room exists; if not, throw NotFoundException.
 * 2. Check if the film exists; if not, throw NotFoundException.
 * 3. Create a new showtime.
 * 4. Return a success message.
 */
  async create(createShowtimeDto: CreateShowtimeDto):Promise<{message:string}> {
    
    const findrooms = await this.roomService.findOne(createShowtimeDto.rooms);
    const capacity = findrooms.capacity;
    const generatedSeats = createShowtimeDto.seats || this.generateSeats(capacity);
    
    
    const existingShowtimes = await this.showtimeModel.find({
      films: createShowtimeDto.films,
      theater: createShowtimeDto.theater,
      rooms: createShowtimeDto.rooms,
      dateAction: createShowtimeDto.dateAction,
    });
    const newStartTime = new Date(createShowtimeDto.startTime);
    const newEndTime = new Date(createShowtimeDto.endTime);
  
    for (const showtime of existingShowtimes) {
      const existingStartTime = new Date(showtime.startTime);
      const existingEndTime = new Date(showtime.endTime);
  
      if (
        (newStartTime >= existingStartTime && newStartTime < existingEndTime) || 
        (newEndTime > existingStartTime && newEndTime <= existingEndTime) || 
        (newStartTime <= existingStartTime && newEndTime >= existingEndTime) 
      ) {
        throw new ConflictException('Suất chiếu trùng khung giờ với suất chiếu hiện có');
      }
    }
    if(!createShowtimeDto.price){
      throw new ConflictException('Giá tiền không được để trống')
    }
    const theater = await this.theaterService.findTheaterByID(createShowtimeDto.theater);
    if(!theater){
      throw new NotFoundException('Theater not found')
    }
    const room = await this.roomService.findOne(createShowtimeDto.rooms);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    const flim = await this.flimService.findOne(createShowtimeDto.films);
    if (!flim) {
      throw new NotFoundException('Flim not found');
    }
    await this.showtimeModel.create(
      {
        films: createShowtimeDto.films,
        theater:createShowtimeDto.theater,
        rooms: createShowtimeDto.rooms,
        price:createShowtimeDto.price,
        seats: generatedSeats.map(seat => ({ seatNumber: seat, status: 'available' })),
        dateAction: createShowtimeDto.dateAction,
        startTime: createShowtimeDto.startTime,
        endTime: createShowtimeDto.endTime,
      }
    );
    return {message:"Created showtime"};
  }







  /**
 * Generates a list of seats based on the room's capacity.
 * @param {number} capacity - The capacity of the room.
 * @returns {string[]} - List of generated seats.
 */
  public generateSeats(capacity: number): string[] {
    const seats: string[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
    let seatCount = 0;
    for (let row of rows) {
      for (let i = 1; i <= 10 && seatCount < capacity; i++) {
        seats.push(`${row}${i}`);
        seatCount++;
      }
    }
    return seats;
}




  
/**
 * Retrieves all showtimes from the database.
 * @returns {Promise<Showtime[]>} - List of showtimes.
 * 
 * Steps:
 * 1. Find all showtimes in the database.
 * 2. If no showtimes are found, throw an error.
 * 3. Return the results.
 */
  async findAll() {
    return this.showtimeModel.find().populate('rooms').populate('films').populate('theater').exec();
  }









 /**
 * Finds a showtime by its ID.
 * @param {string} id - The ID of the showtime to find.
 * @returns {Promise<Showtime>} - The found showtime.
 * @throws {NotFoundException} - If the showtime is not found.
 * 
 * Steps:
 * 1. Find the showtime by ID in the database.
 * 2. If not found, throw NotFoundException.
 * 3. Return the showtime.
 */
  async findOne(id: string) {
    const showtime = await this.showtimeModel.findById(id).populate('rooms').populate('films').populate('theater').exec();
    if (!showtime) {
      throw new NotFoundException('Showtime not found');
    }
    return showtime;
  }




  /**
 * Books specific seats for a showtime.
 * @param {string} showtimeId - The ID of the showtime.
 * @param {string[]} seats - The list of seats to book.
 * 
 * Steps:
 * 1. Update the showtime with the specified ID.
 * 2. Set the status of the selected seats to "booked".
 * 3. Use array filters to match the seat numbers.
 */
  async bookSeats(showtimeId: string, seats: string[]) {
    await this.showtimeModel.updateOne(
        { _id: showtimeId },
        {
            $set: {
                "seats.$[elem].status": "booked"
            }
        },
        {
            arrayFilters: [{ "elem.seatNumber": { $in: seats } }]
        }
    );
}






/**
 * Updates the seats for a specific showtime.
 * @param {string} id - The ID of the showtime.
 * @param {any[]} seats - The updated list of seats.
 * @returns {Promise<Showtime | null>} - The updated showtime or null if not found.
 */
  async updateSeats(id: string, seats: any[]): Promise<Showtime | null> {
    return this.showtimeModel.findByIdAndUpdate(
      id,
      { $set: { seats } }, 
      { new: true }
    ).exec();
  }
  








 /**
 * Updates a showtime by its ID.
 * @param {string} id - The ID of the showtime to update.
 * @param {UpdateShowtimeDto} updateShowtimeDto - Data to update the showtime.
 * @returns {Promise<Showtime>} - The updated showtime.
 * @throws {NotFoundException} - If the showtime is not found.
 * 
 * Steps:
 * 1. Find the showtime by ID in the database.
 * 2. If not found, throw NotFoundException.
 * 3. Update the showtime and return the result.
 */
   async update(id: string, updateShowtimeDto: UpdateShowtimeDto) {
    const updatedShowtime = await this.showtimeModel.findByIdAndUpdate(id, updateShowtimeDto, { new: true }).exec();
    if (!updatedShowtime) {
      throw new NotFoundException('Showtime not found');
    }
    return updatedShowtime;
  }



/**
 * Updates the status of a showtime to "closed".
 * @param {string} id - The ID of the showtime.
 * @returns {Promise<any>} - The result of the update operation.
 */
 async updateStatus(id:string){
   const showtime= await this.showtimeModel.updateOne({ _id: id }, { $set: { status: 'closed' } })
  return showtime
 }





 
 /**
 * Deletes a showtime by its ID.
 * @param {string} id - The ID of the showtime to delete.
 * @returns {Promise<Showtime>} - The deleted showtime.
 * @throws {NotFoundException} - If the showtime is not found.
 * 
 * Steps:
 * 1. Find the showtime by ID in the database.
 * 2. If not found, throw NotFoundException.
 * 3. Delete the showtime and return the result.
 */
  async remove(id: string) {
    const deletedShowtime = await this.showtimeModel.findByIdAndDelete(id).exec();
    if (!deletedShowtime) {
      throw new NotFoundException('Showtime not found');
    }
    return deletedShowtime;
  }
}
