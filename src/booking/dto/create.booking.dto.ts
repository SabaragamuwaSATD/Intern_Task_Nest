export class CreateBookingDto {
  cCode: string;
  contact: string;
  email: string;
  passengers: {
    id?: number;
    title: string;
    fName: string;
    lName: string;
    dob: Date;
    country: string;
  }[];
}
