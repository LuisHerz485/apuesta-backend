import { Module } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { ReservationController } from 'src/apuesta.distribuited.services/controllers/reservation.controller';
import { Seat } from 'src/apuesta.domain.entities/models/seat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [ReservationService],
    controllers: [ReservationController],
    exports: [ReservationService],
    imports: [TypeOrmModule.forFeature([Seat])],
})
export class ReservationModule {}
