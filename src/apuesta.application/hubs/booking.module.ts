import { Module } from '@nestjs/common';
import { SagaService } from '../services/saga.service';
import { BookingProcessor } from 'src/apuesta.infraestructure/messaging/processors/booking.processor';
import { BookingController } from 'src/apuesta.distribuited.services/controllers/booking.controller';
import { BullModule } from '@nestjs/bull';
import { CustomersModule } from './customers.module';
import { FlightsModule } from './flight.module';
import { PaymentsModule } from './payments.module';
import { ReservationService } from '../services/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from 'src/apuesta.domain.entities/models/seat.entity';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'saga_queue',
        }),
        FlightsModule,
        CustomersModule,
        PaymentsModule,
        TypeOrmModule.forFeature([Seat]),
    ],
    controllers: [BookingController],
    providers: [SagaService, BookingProcessor, ReservationService],
    exports: [BookingModule],
})
export class BookingModule {}
