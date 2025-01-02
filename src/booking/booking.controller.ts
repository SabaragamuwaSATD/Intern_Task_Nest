import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create.booking.dto';
import { UpdateBookingDto } from './dto/update.booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAllBookings();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookingService.findOne(id);
  }

  @Put(':id')
  updateBooking(
    @Param('id') id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookingService.deleteBooking(id);
  }

  @Delete(':bookingId/passenger/:passengerId')
  removePassenger(
    @Param('bookingId') bookingId: number,
    @Param('passengerId') passengerId: number,
  ) {
    return this.bookingService.deletePassenger(bookingId, passengerId);
  }

  // @Post('/add')
  // addBooking(
  //   @Body('cCode') cCode: string,
  //   @Body('contact') contact: string,
  //   @Body('email') email: string,
  //   @Body('passengers')
  //   passengers: {
  //     title: string;
  //     fName: string;
  //     lName: string;
  //     dob: Date;
  //     country: string;
  //   }[],
  // ) {
  //   return this.bookingService.addBooking(cCode, contact, email, passengers);
  // }

  // @Get('/all')
  // getAllBooking() {
  //   return this.bookingService.getAllBooking();
  // }

  // @Get('/:id')
  // getBookingById(@Param('id') bookingId: string) {
  //   return this.bookingService.getBookingById(bookingId);
  // }

  // @Patch('/:id')
  // updateBooking(
  //   @Param('id') bookingId: string,
  //   @Body('cCode') cCode: string,
  //   @Body('contact') contact: string,
  //   @Body('email') email: string,
  //   @Body('passengers')
  //   passengers: {
  //     title: string;
  //     fName: string;
  //     lName: string;
  //     dob: Date;
  //     country: string;
  //   }[],
  // ) {
  //   return this.bookingService.updateBooking(
  //     bookingId,
  //     cCode,
  //     contact,
  //     email,
  //     passengers,
  //   );
  // }
}
