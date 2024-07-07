import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/apuesta.application.dto';
import { CreateCustomerDto } from 'src/apuesta.application.dto/customer/createCustomer.dto';
import { LoginRequestDto } from 'src/apuesta.application.dto/customer/loginRequest.dto';
import { CustomersService } from 'src/apuesta.application/services/customer.service';
import { Customer } from 'src/apuesta.domain.entities/models/customer.entity';

@ApiTags('customer')
@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post('login')
    @ApiOperation({ summary: 'Obtener el tokern' })
    async login(@Body() request: LoginRequestDto) {
        return this.customersService.login(request);
    }

    @Post('register')
    @ApiOperation({ summary: 'Registrar cliente' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Este endpoint prueba reserva vuelos',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Error interno del servidor',
    })
    public async registerCustomer(
        @Body() request: CreateCustomerDto,
    ): Promise<Result<Customer>> {
        const customerExist = await this.customersService.findByUserName(
            request.userName,
        );

        if (customerExist) {
            throw new HttpException(
                'Este nombre de usuario ya existe',
                HttpStatus.FOUND,
            );
        }

        await this.customersService.create(request);
        return new Result(HttpStatus.CREATED);
    }
}
