import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/add')
  addBooking(
    @Body('cCode') cCode: string,
    @Body('contact') contact: string,
    @Body('email') email: string,
    @Body('passengers')
    passengers: {
      title: string;
      fName: string;
      lName: string;
      dob: Date;
      country: string;
    }[],
  ) {
    return this.bookingService.addBooking(cCode, contact, email, passengers);
  }

  @Get('/all')
  getAllBooking() {
    return this.bookingService.getAllBooking();
  }

  @Get('/:id')
  getBookingById(@Param('id') bookingId: string) {
    return this.bookingService.getBookingById(bookingId);
  }
}
