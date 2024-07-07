import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFlightDto, Result } from 'src/apuesta.application.dto';
import { PaginatedResponse } from 'src/apuesta.application.dto/global/paginated-result.dto';
import { FlightsService } from 'src/apuesta.application/services/flight.service';
import { Flight } from 'src/apuesta.domain.entities/models/flight.entity';

@ApiTags('flights')
@Controller('flights')
export class FlightsController {
    constructor(private readonly flightService: FlightsService) {}

    @Post()
    @ApiOperation({ summary: 'Crear nuevo vuelo' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Este endpoint prueba reserva vuelos',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Error interno del servidor',
    })
    public async createFlight(
        @Body() request: CreateFlightDto,
    ): Promise<Result<Flight>> {
        const flightExist = await this.flightService.findByFlightNumber(
            request.flightNumber,
        );

        if (flightExist) {
            throw new HttpException('Este Vuelo ya existe', HttpStatus.FOUND);
        }

        const createdFlight = await this.flightService.create(request);

        return new Result(HttpStatus.CREATED, createdFlight);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los vuelos paginados' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Éxito al obtener vuelos paginados',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Error interno del servidor',
    })
    async findAll(): Promise<PaginatedResponse<Flight>> {
        const flights = await this.flightService.findAll();

        return new PaginatedResponse<Flight>(
            flights.flights,
            flights.totalRecords,
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un vuelo por ID' })
    @ApiParam({ name: 'id', description: 'ID del vuelo a buscar' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Éxito al obtener el vuelo',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Vuelo no encontrado',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Error interno del servidor',
    })
    async findOne(@Param('id') id: number): Promise<Result<Flight>> {
        const flight = await this.flightService.findOne(id);
        if (!flight) {
            throw new HttpException(
                'Vuelo no encontrado',
                HttpStatus.NOT_FOUND,
            );
        }
        return new Result(HttpStatus.OK, flight);
    }
}
