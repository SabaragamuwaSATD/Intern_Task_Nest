import { Injectable } from '@nestjs/common';
import { Booking } from './booking.model';

@Injectable()
export class BookingService {
  // array for the saving data of booking
  private bookings: Booking[] = [];

  // function for adding booking
  addBooking(
    cCode: string,
    contact: string,
    email: string,
    passengers: {
      title: string;
      fName: string;
      lName: string;
      dob: Date;
      country: string;
    }[],
  ) {
    const combinedContatct = `${cCode}${contact}`;
    const combinedPassengers = passengers.map((p) => ({
      fullName: `${p.title} ${p.fName} ${p.lName}`,
      dob: p.dob,
      country: p.country,
    }));
    const newBooking = new Booking(
      Math.random().toString(),
      combinedContatct,
      email,
      combinedPassengers,
    );
    this.bookings.push(newBooking);
    return newBooking.id;
  }

  // function for getting all booking
  getAllBooking() {
    return [...this.bookings];
  }
}
