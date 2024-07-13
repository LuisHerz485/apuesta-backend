import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PaymentsService } from '../services/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/apuesta.domain.entities/models/payments.entity';
import { Customer } from 'src/apuesta.domain.entities/models/customer.entity';
import { CustomersService } from '../services/customer.service';
import { Seat } from 'src/apuesta.domain.entities/models/seat.entity';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'saga_queue',
        }),
        TypeOrmModule.forFeature([Payment, Customer, Seat]),
    ],
    providers: [PaymentsService, CustomersService],
    controllers: [],
    exports: [PaymentsService],
})
export class PaymentsModule {}
