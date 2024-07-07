import { Body, Controller, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/apuesta.application.dto';
import { ReservationSeatDto } from 'src/apuesta.application.dto/reservation/reservationSeat.dto';
import { TemporalReservationSeat } from 'src/apuesta.application.dto/reservation/temporalReservation.dto';
import { ReservationService } from 'src/apuesta.application/services/reservation.service';

@ApiTags('temporal-reservation')
@Controller('temp-reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Post()
    @ApiOperation({ summary: 'Se reserva el asiento, mientras se paga' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Este endpoint prueba reserva vuelos',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Error interno del servidor',
    })
    public async temporalReservationSeat(
        @Body() request: TemporalReservationSeat,
    ) {
        this.reservationService.temporalReservationSeat(request);

        return new Result(HttpStatus.OK);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Cancelar reserva asiento' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Este endpoint prueba reserva vuelos',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Error interno del servidor',
    })
    public async cancelReservation(@Param('id') id: number) {
        const params: ReservationSeatDto = {
            idSeat: id,
            idFlight: null,
            idCustomer: null,
        };
        this.reservationService.cancelSeat('DEMO', params);

        return new Result(HttpStatus.OK);
    }
}
