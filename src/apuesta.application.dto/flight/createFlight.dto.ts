import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateFlightDto {
    @IsString()
    @ApiProperty({ example: '123', description: 'Numero de vuelo' })
    flightNumber: string;

    @IsString()
    @ApiProperty({ example: 'AQP', description: 'Codigo de lugar de partida' })
    departure: string;

    @IsString()
    @ApiProperty({
        example: 'LIM',
        description: 'Codigo de lugar de aterrizaje',
    })
    arrival: string;

    @IsDate()
    @ApiProperty({
        example: '2024-07-08T10:00:00Z',
        description: 'Fecha y hora de salida del vuelo',
    })
    departureTime: Date;

    @IsDate()
    @ApiProperty({
        example: '2024-07-08T10:00:00Z',
        description: 'Fecha y hora de aterrizaje del vuelo',
    })
    arrivalTime: Date;
}
