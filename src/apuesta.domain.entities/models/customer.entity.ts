import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column({ default: 1 })
    status: string;

    @Column({ default: 2000 })
    amount: number;
}
