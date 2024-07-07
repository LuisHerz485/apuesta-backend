import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PaymentsService } from '../services/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/apuesta.domain.entities/models/payments.entity';
import { Customer } from 'src/apuesta.domain.entities/models/customer.entity';
import { CustomersService } from '../services/customer.service';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'saga_queue',
        }),
        TypeOrmModule.forFeature([Payment, Customer]),
    ],
    providers: [PaymentsService, CustomersService],
    controllers: [],
    exports: [PaymentsService],
})
export class PaymentsModule {}
