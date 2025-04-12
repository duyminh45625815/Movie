import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { ShowtimeService } from '../showtime/showtime.service';

import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from '../user/user.service';
import { FoodService } from '../food/food.service';
import { FlimsService } from '../flims/flims.service';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name)
    private bookingModel: Model<Booking>,
    private showtimeService: ShowtimeService,
    private readonly mailerService: MailerService,
    private userService: UserService,
    private filmsService: FlimsService
  ) { }




  /**
 * Creates a new booking.
 * @param {CreateBookingDto} createBookingDto - Data to create the booking.
 * @returns {Promise<Booking>} - The newly created booking.
 * @throws {ConflictException} - If any of the selected seats are already booked or unavailable.
 * 
 * Steps:
 * 1. Finds the showtime associated with the booking.
 * 2. Checks if the selected seats are available.
 * 3. If any seat is unavailable, throws a ConflictException.
 * 4. Books the seats in the showtime.
 * 5. Creates and saves the booking in the database.
 * 6. Returns the created booking.
 */
  async create(createBookingDto: CreateBookingDto) {
    const showtime = await this.showtimeService.findOne(createBookingDto.showtime)
    const checkSeats = createBookingDto.seats.filter(seatNumber => {
      const seat = showtime.seats.find(s => s.seatNumber === seatNumber);
      return !seat || seat.status !== 'available';
    });
    if (checkSeats.length > 0) {
      throw new ConflictException(`Seats ${checkSeats.join(' , ')} are already booked or not available`);
    }
    await this.showtimeService.bookSeats(createBookingDto.showtime, createBookingDto.seats);
    const booking = await this.bookingModel.create({
      user: createBookingDto.user,
      combo: createBookingDto.combo,
      showtime: createBookingDto.showtime,
      seats: createBookingDto.seats,
      totalPrice: createBookingDto.totalPrice,
      status: createBookingDto.status
    })
    return booking.save();
  }









  /**
 * Retrieves all bookings from the database.
 * @returns {Promise<Booking[]>} - List of all bookings with populated showtime, combo, and user details.
 * 
 * Steps:
 * 1. Finds all bookings in the database.
 * 2. Populates the showtime, combo.food, and user fields.
 * 3. Returns the list of bookings.
 */
  async findAll(): Promise<Booking[]> {
    const findBooking = await this.bookingModel.find().populate({
      path: 'showtime',
      populate: {
        path: 'films',
      },
    }).populate('combo.food').populate('user')
    return findBooking;
  }









  /**
 * Finds a booking by its ID.
 * @param {number} id - The ID of the booking to find.
 * @returns {string} - A placeholder message indicating the booking ID.
 * 
 * Note: This method is currently a placeholder and needs implementation.
 */
  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }










/**
 * Updates the status of a booking to "paid" and sends a confirmation email.
 * @param {string} id - The ID of the booking to update.
 * @returns {Promise<{ message: string, data?: Booking }>} - A success message and the updated booking.
 * 
 * Steps:
 * 1. Finds the booking by ID and updates its status to "paid".
 * 2. Populates the showtime, combo.food, and user fields.
 * 3. If the booking is not found, returns an error message.
 * 4. Sends a confirmation email to the user with booking details.
 * 5. Returns a success message and the updated booking.
 */
  async update(id: string): Promise<{ message: string; data?: Booking; }> {
    const updateStatus = await this.bookingModel.findOneAndUpdate(
      { _id: id },
      { status: 'paid' },
      { new: true }
    ).populate({
      path: 'showtime',
      populate: { path: 'films', select: 'title' }
    }).populate('combo.food').populate({
      path: 'user',
      select: 'email firstName lastName',
    });

    if (!updateStatus) {
      return { message: "Không tìm thấy đơn hàng!" };
    }
    const findShowtime = await this.showtimeService.findOne(updateStatus.showtime._id.toString());
    const findUser = await this.userService.findUserByID(updateStatus.user._id.toString())
    const findFilms = await this.filmsService.findOne(findShowtime?.films?._id.toString())

    try {
      await this.mailerService.sendMail({
        to: findUser?.email,
        subject: 'Xác nhận đặt vé xem phim',
        template: 'ticket',
        context: {
          name: `${findUser?.firstName} ${findUser?.lastName}` ,
          movie: findFilms?.title,
          date: findShowtime.dateAction instanceof Date ? findShowtime.dateAction.toLocaleDateString() : "N/A",
          time: findShowtime.startTime instanceof Date ? findShowtime.startTime.toLocaleTimeString() : "N/A",
          seats: updateStatus.seats ? updateStatus.seats.join(', ') : "N/A",
          price: updateStatus.totalPrice || 0,
        },
      });

      return { message: "Cập nhật thành công, email xác nhận đã được gửi!", data: updateStatus };
    } catch (error) {
          throw new error
    }

  }





  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
