import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BookFlightDto } from 'src/apuesta.application.dto';
import { SagaService } from 'src/apuesta.application/services/saga.service';

@ApiBearerAuth('access-token')
@ApiTags('book-flight')
@Controller('booking')
@UseGuards(AuthGuard('jwt'))
export class BookingController {
    constructor(private readonly sagaService: SagaService) {}

    @Post('book-flight')
    @ApiOperation({ summary: 'Reservar un vuelo' })
    @ApiResponse({
        status: 201,
        description: 'El vuelo fue reservado con exito',
    })
    @ApiResponse({ status: 400, description: 'Parámetros inválidos.' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
    async bookFlight(@Body() request: BookFlightDto) {
        const params = request;

        return this.sagaService.bookFlightSaga(params);
    }
}
