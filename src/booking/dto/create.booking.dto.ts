export class CreateBookingDto {
  cCode: string;
  contact: string;
  email: string;
  passengers: {
    title: string;
    fName: string;
    lName: string;
    dob: Date;
    country: string;
  }[];
}
