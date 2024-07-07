import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codSeat: string;

    @Column()
    idFlight: number;

    @Column({ nullable: true })
    idCustomer: number;

    @Column()
    status: number;

    @Column()
    price: number;

    @Column({ nullable: true })
    dateReservation: Date;

    @Column({ nullable: true })
    paidSeat: Date;
}
