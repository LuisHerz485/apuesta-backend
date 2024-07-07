import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/apuesta.domain.entities/models/customer.entity';
import { Flight } from 'src/apuesta.domain.entities/models/flight.entity';
import { Payment } from 'src/apuesta.domain.entities/models/payments.entity';
import { Seat } from 'src/apuesta.domain.entities/models/seat.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            schema: 'prueba',
            database: 'prueba-tecnica',
            entities: [Flight, Customer, Seat, Payment, Seat],
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
    exports: [DataBaseModule],
})
export class DataBaseModule {}
