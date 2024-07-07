import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    flightNumber: string;

    @Column()
    departure: string;

    @Column()
    arrival: string;

    @Column()
    departureTime: Date;

    @Column()
    arrivalTime: Date;

    @Column({ default: 1 })
    status: number;
}
