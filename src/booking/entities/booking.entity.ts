import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'booking' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  cCode: string;

  @Column({ type: 'text', nullable: false })
  contact: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'json', nullable: false })
  passengers: {
    title: string;
    fName: string;
    lName: string;
    dob: Date;
    country: string;
  }[];
}

// export class Booking {
//     constructor(
//       public id: string,
//       public contact: string,
//       public email: string,
//       public passengers: {
//         fullName: string;
//         dob: Date;
//         country: string;
//       }[],
//     ) {}
//   }
