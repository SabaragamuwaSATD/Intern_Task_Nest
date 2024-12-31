export class Booking {
  constructor(
    public id: string,
    public contact: string,
    public email: string,
    public passengers: {
      fullName: string;
      dob: Date;
      country: string;
    }[],
  ) {}
}
