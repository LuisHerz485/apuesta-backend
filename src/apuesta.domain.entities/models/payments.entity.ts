import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'USD' })
    currency: string;

    @Column()
    amount: number;

    @Column()
    datePaid: Date;

    @Column()
    idCustomer: number;

    @Column()
    idFlight: number;

    @Column()
    idSeat: number;
}
