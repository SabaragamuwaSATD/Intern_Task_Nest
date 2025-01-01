import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create.booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  //after postgreSql configirations.........................................................
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    const booking = this.bookingRepository.create(createBookingDto);

    await this.bookingRepository.save(booking);
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
