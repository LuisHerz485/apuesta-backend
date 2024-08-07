import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FlightsService } from '../services/flight.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from 'src/apuesta.domain.entities/models/flight.entity';
import { FlightsController } from 'src/apuesta.distribuited.services/controllers/flight.controller';
import { Seat } from 'src/apuesta.domain.entities/models/seat.entity';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'saga_queue',
        }),
        TypeOrmModule.forFeature([Flight, Seat]),
    ],
    providers: [FlightsService],
    controllers: [FlightsController],
    exports: [FlightsService],
})
export class FlightsModule {}
