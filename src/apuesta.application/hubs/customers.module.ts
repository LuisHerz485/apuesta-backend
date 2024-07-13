import { Module } from '@nestjs/common';
import { CustomersService } from '../services/customer.service';
import { CustomersController } from 'src/apuesta.distribuited.services/controllers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/apuesta.domain.entities/models/customer.entity';
import { Seat } from 'src/apuesta.domain.entities/models/seat.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Seat])],
    providers: [CustomersService],
    exports: [CustomersService],
    controllers: [CustomersController],
})
export class CustomersModule {}
