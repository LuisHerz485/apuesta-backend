import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFlightDto } from 'src/apuesta.application.dto';
import { Flight } from 'src/apuesta.domain.entities/models/flight.entity';
import { Seat } from 'src/apuesta.domain.entities/models/seat.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class FlightsService {
    constructor(
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
        @InjectRepository(Seat)
        private readonly seatRepository: Repository<Seat>,
    ) {}

    async releaseFlightReservation(
        sagaId: string,
        customerId: string,
        flightId: string,
    ) {
        console.log(sagaId, customerId, flightId);
    }

    async findAll() {
        try {
            const flights = await this.flightRepository.find({
                where: { status: 1 },
            });
            const totalRecords = await this.flightRepository.count({
                where: { status: 1 },
            });
            return { flights, totalRecords };
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findOne(id: number): Promise<Flight> {
        try {
            const options: FindOneOptions<Flight> = {
                where: { id },
            };
            return await this.flightRepository.findOne(options);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async findByFlightNumber(flightNumber: string): Promise<Flight> {
        return await this.flightRepository.findOneBy({ flightNumber });
    }

    public async findSeatsByFlight(idFlight: number): Promise<Seat[]> {
        return await this.seatRepository.find({
            where: { idFlight, status: 1 },
        });
    }

    public async create(request: CreateFlightDto) {
        try {
            const flight = this.flightRepository.create(request);
            return await this.flightRepository.save(flight);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: number, updateFlightDto: Partial<CreateFlightDto>) {
        try {
            const flight = await this.findOne(id);
            if (!flight) {
                throw new Error(`Vuelo con el ID ${id} no encontrado`);
            }
            const updatedFlight = { ...flight, ...updateFlightDto };
            return await this.flightRepository.save(updatedFlight);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async remove(id: number) {
        const flight = await this.findOne(id);
        if (!flight) {
            throw new Error(`Vuelo con el ID ${id} no encontrado`);
        }
        return await this.flightRepository.remove(flight);
    }
}
