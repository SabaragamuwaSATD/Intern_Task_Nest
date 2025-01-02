import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create.booking.dto';
import { Booking } from './entities/booking.entity';
import { UpdateBookingDto } from './dto/update.booking.dto';
import { merge } from 'lodash';

@Injectable()
export class BookingService {
  //after postgreSql configirations.........................................................
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    const booking = this.bookingRepository.create(createBookingDto);

    booking.passengers.forEach((passeger, index) => {
      passeger.id = index + 1;
    });

    await this.bookingRepository.save(booking);
  }

  async findAllBookings() {
    return await this.bookingRepository.find();
  }

  async findOne(id: number) {
    return await this.bookingRepository.findOne({ where: { id } });
  }

  async updateBooking(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id);
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }

    if (updateBookingDto.passengers) {
      updateBookingDto.passengers.forEach((updatedPassenger) => {
        if (updatedPassenger.id) {
          const passenger = booking.passengers.find(
            (p) => p.id === updatedPassenger.id,
          );
          if (passenger) {
            Object.assign(passenger, updatedPassenger);
          } else {
            throw new NotFoundException(
              `Passenger with id ${updatedPassenger.id} not found`,
            );
          }
        } else {
          // Assign a new id to the new passenger
          const newPassengerId = booking.passengers.length
            ? Math.max(...booking.passengers.map((p) => p.id)) + 1
            : 1;
          booking.passengers.push({ ...updatedPassenger, id: newPassengerId });
        }
      });
    }

    // Merge other fields from updateBookingDto into booking
    const { passengers, ...otherUpdates } = updateBookingDto;
    merge(booking, otherUpdates);

    return await this.bookingRepository.save(booking);
  }

  // deleteBooking...............................................................
  async deleteBooking(id: number) {
    const booking = await this.findOne(id);
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }

    await this.bookingRepository.remove(booking);
    return { message: `Booking with id ${id} deleted successfully` };
  }

  //delete specific passenger from booking...............................................
  async deletePassenger(bookingId: number, passengerId: number) {
    const booking = await this.findOne(bookingId);
    if (!booking) {
      throw new NotFoundException(`Booking with id ${bookingId} not found`);
    }

    const passengerIndex = booking.passengers.findIndex(
      (p) => p.id === Number(passengerId),
    );

    if (passengerIndex === -1) {
      throw new NotFoundException(`Passenger with id ${passengerId} not found`);
    }

    booking.passengers.splice(passengerIndex, 1);

    await this.bookingRepository.save(booking);

    return { message: `Passenger with id ${passengerId} deleted successfully` };
  }

  // array for the saving data of booking....................................................
  // private bookings: Booking[] = [];

  // // function for adding booking
  // addBooking(
  //   cCode: string,
  //   contact: string,
  //   email: string,
  //   passengers: {
  //     title: string;
  //     fName: string;
  //     lName: string;
  //     dob: Date;
  //     country: string;
  //   }[],
  // ) {
  //   const combinedContatct = `${cCode}${contact}`;
  //   const combinedPassengers = passengers.map((p) => ({
  //     fullName: `${p.title} ${p.fName} ${p.lName}`,
  //     dob: p.dob,
  //     country: p.country,
  //   }));
  //   const newBooking = new Booking(
  //     Math.random().toString(),
  //     combinedContatct,
  //     email,
  //     combinedPassengers,
  //   );
  //   this.bookings.push(newBooking);
  //   return newBooking.id;
  // }

  // // function for getting all booking
  // getAllBooking() {
  //   return [...this.bookings];
  // }

  // // function for getting booking by id
  // getBookingById(bookingId: string) {
  //   const booking = this.findBooking(bookingId)[0];
  //   return { ...booking };
  // }

  // // function for updating booking
  // updateBooking(
  //   bookingId: string,
  //   cCode?: string,
  //   contact?: string,
  //   email?: string,
  //   passengers?: {
  //     title?: string;
  //     fName?: string;
  //     lName?: string;
  //     dob?: Date;
  //     country?: string;
  //   }[],
  // ) {
  //   const [booking, index] = this.findBooking(bookingId);

  //   const updatedContact =
  //     cCode && contact ? `${cCode}${contact}` : booking.contact;
  //   const updatedEmail = email ?? booking.email;
  //   const updatedPassengers = passengers
  //     ? passengers.map((p, i) => {
  //         const existingPassenger = booking.passengers[i] || {
  //           fullName: '',
  //           dob: new Date(),
  //           country: '',
  //         };
  //         const title = p.title ?? existingPassenger.fullName.split(' ')[0];
  //         const fName = p.fName ?? existingPassenger.fullName.split(' ')[1];
  //         const lName = p.lName ?? existingPassenger.fullName.split(' ')[2];
  //         return {
  //           fullName: `${title} ${fName} ${lName}`,
  //           dob: p.dob ?? existingPassenger.dob,
  //           country: p.country ?? existingPassenger.country,
  //         };
  //       })
  //     : booking.passengers;

  //   this.bookings[index] = {
  //     ...booking,
  //     contact: updatedContact,
  //     email: updatedEmail,
  //     passengers: updatedPassengers,
  //   };
  // }

  // private findBooking(id: string): [Booking, number] {
  //   const bookingIndex = this.bookings.findIndex((b) => b.id === id);
  //   const booking = this.bookings[bookingIndex];
  //   if (!booking) {
  //     throw new Error('Could not find booking.');
  //   }
  //   return [booking, bookingIndex];
  // }
}
