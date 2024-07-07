import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationSeatDto } from 'src/apuesta.application.dto/reservation/reservationSeat.dto';
import { TemporalReservationSeat } from 'src/apuesta.application.dto/reservation/temporalReservation.dto';
import { Seat } from 'src/apuesta.domain.entities/models/seat.entity';
import { SEAT_RESERVATION } from 'src/apuesta.infraestructure.cross.cuting/constants/seatReservation';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Seat)
        private readonly seatRepository: Repository<Seat>,
    ) {}

    async findOne(id: number): Promise<Seat> {
        try {
            const options: FindOneOptions<Seat> = {
                where: { id },
            };

            return await this.seatRepository.findOne(options);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async temporalReservationSeat(request: TemporalReservationSeat) {
        try {
            const seatExist = await this.findOne(request.idSeat);

            if (!seatExist) {
                throw new HttpException(
                    'Asiento no encontrado',
                    HttpStatus.NOT_FOUND,
                );
            }

            seatExist.status = SEAT_RESERVATION.RESERVATION;
            seatExist.idCustomer = request.idCustomer;
            seatExist.idFlight = request.idFlight;
            seatExist.dateReservation = new Date();

            await this.seatRepository.save(seatExist);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async paidSeat(sagaId: string, request: ReservationSeatDto) {
        try {
            const seatExist = await this.findOne(request.idSeat);

            if (!seatExist) {
                throw new HttpException(
                    'Asiento no encontrado',
                    HttpStatus.NOT_FOUND,
                );
            }

            seatExist.status = SEAT_RESERVATION.PAID;
            seatExist.paidSeat = new Date();
            seatExist.idCustomer = request.idCustomer;

            await this.seatRepository.save(seatExist);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async cancelSeat(sagaId: string, request: ReservationSeatDto) {
        try {
            const seatExist = await this.findOne(request.idSeat);

            if (!seatExist) {
                throw new HttpException(
                    'Asiento no encontrado',
                    HttpStatus.NOT_FOUND,
                );
            }

            seatExist.status = SEAT_RESERVATION.FREE;
            seatExist.paidSeat = null;
            seatExist.idCustomer = null;

            await this.seatRepository.save(seatExist);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
