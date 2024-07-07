import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { BookFlightDto } from 'src/apuesta.application.dto/';
import { v4 as uuid } from 'uuid';
import { FlightsService } from './flight.service';
import { PaymentsService } from './payment.service';
import { CustomersService } from './customer.service';
import { ReservationService } from './reservation.service';

@Injectable()
export class SagaService {
    constructor(
        @InjectQueue('saga_queue') private readonly sagaQueue: Queue,
        private readonly flightService: FlightsService,
        private readonly reservationService: ReservationService,
        private readonly paymentsService: PaymentsService,
        private readonly customerService: CustomersService,
    ) {}

    private generateIdSaga(): string {
        return uuid();
    }

    async bookFlightSaga(request: BookFlightDto) {
        const sagaId = this.generateIdSaga();

        try {
            const pricing = await this.reservationService.findOne(
                request.idSeat,
            );

            const processPaymentTask = await this.sagaQueue.add(
                'processPayment',
                {
                    sagaId,
                    request,
                    amount: this.calculateFlightPrice(
                        request.idCustomer,
                        pricing.price,
                    ),
                },
            );

            const reserveFlightTask = await this.sagaQueue.add('reserveSeat', {
                sagaId,
                request,
            });

            await Promise.all([
                processPaymentTask.finished(),
                reserveFlightTask.finished(),
            ]);

            const issueTicketTask = await this.sagaQueue.add('issueTicket', {
                sagaId,
                ...request,
            });

            const result = await issueTicketTask.finished();

            return { success: true, result };
        } catch (error) {
            await this.cancelFlightSaga(sagaId, { ...request });
            return {
                success: false,
                error: 'Error durante la transacción. Se canceló la reserva del vuelo.',
            };
        }
    }

    async cancelFlightSaga(sagaId: string, request: BookFlightDto) {
        try {
            await this.sagaQueue.add('cancelTicket', {
                sagaId,
                request,
            });

            await this.sagaQueue.add('refundPayment', {
                sagaId,
                request,
            });

            await this.sagaQueue.add('releaseFlightReservation', {
                sagaId,
                request,
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: 'Error al cancelar la transaccion. Conectate a soporte tecnico',
            };
        }
    }

    private calculateFlightPrice(idCustomer: number, price: number): number {
        //Aqui yo colocaria logica para posiblemente hacer cambio de moneda
        this.discountAmountCustomer(idCustomer, price);
        return price;
    }

    public async discountAmountCustomer(idCustomer: number, price: number) {
        this.customerService.discountAmount(idCustomer, price);
    }
}
