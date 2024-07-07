import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BookFlightDto {
    @IsString()
    @ApiProperty({ example: 123, description: 'ID del cliente' })
    idCustomer: number;

    @IsString()
    @ApiProperty({ example: 456, description: 'ID del vuelo' })
    idFlight: number;

    @IsString()
    @ApiProperty({ example: 78, description: 'Numero de Asiento' })
    idSeat: number;
}
