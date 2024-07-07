import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @ApiProperty({ example: 'lhernandez', description: 'usuario' })
    userName: string;

    @IsString()
    @ApiProperty({ example: '1234', description: 'contrasena' })
    password: string;
}
