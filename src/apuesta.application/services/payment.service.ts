import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookFlightDto } from 'src/apuesta.application.dto';
import { Payment } from 'src/apuesta.domain.entities/models/payments.entity';
import { Repository } from 'typeorm';
import { CustomersService } from './customer.service';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly customerService: CustomersService,
    ) {}
    async processPayment(
        sagaId: string,
        request: BookFlightDto,
        amount: number,
    ) {
        try {
            const params: Partial<Payment> = {
                amount,
                datePaid: new Date(),
                idCustomer: request.idCustomer,
                idFlight: request.idFlight,
                idSeat: request.idSeat,
            };

            const payment = this.paymentRepository.create(params);
            return await this.paymentRepository.save(payment);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async refundPayment(customerId: number, pricing: number) {
        try {
            this.customerService.rollBackAmount(customerId, pricing);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
