import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReservationSeatDto {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID de vuelo' })
    idFlight: number;

    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID de asiento' })
    idSeat: number;

    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID de cliente' })
    idCustomer: number;
}
