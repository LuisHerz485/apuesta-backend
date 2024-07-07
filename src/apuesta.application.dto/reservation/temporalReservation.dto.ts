import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TemporalReservationSeat {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID del asiento' })
    idSeat: number;

    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID del cliente' })
    idCustomer: number;

    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID del vuelo' })
    idFlight: number;
}
