import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { v4 as uuidv4 } from 'uuid';
import { FlightsService } from 'src/apuesta.application/services/flight.service';
import { PaymentsService } from 'src/apuesta.application/services/payment.service';

@Injectable()
export class Gateway {
    constructor(
        @InjectQueue('saga_queue') private readonly sagaQueue: Queue,
        private readonly flightsService: FlightsService,
        private readonly paymentsService: PaymentsService,
    ) {}

    private generateSagaId(): string {
        return uuidv4();
    }

    async bookFlightSaga(
        customerId: string,
        flightId: string,
        seatNumber: string,
    ) {
        const sagaId = this.generateSagaId();

        try {
            const reserveFlightTask = await this.sagaQueue.add(
                'reserveFlight',
                {
                    sagaId,
                    customerId,
                    flightId,
                    seatNumber,
                },
            );

            const processPaymentTask = await this.sagaQueue.add(
                'processPayment',
                {
                    sagaId,
                    customerId,
                    flightId,
                    amount: this.calculateFlightPrice(),
                },
            );

            await Promise.all([
                reserveFlightTask.finished(),
                processPaymentTask.finished(),
            ]);

            await this.sagaQueue.add('issueTicket', {
                sagaId,
                customerId,
                flightId,
            });

            return { success: true };
        } catch (error) {
            await this.cancelFlightSaga(sagaId, customerId, flightId);
            return {
                success: false,
                message:
                    'Error durante la transacción. Se canceló la reservacion.',
            };
        }
    }

    async cancelFlightSaga(
        sagaId: string,
        customerId: string,
        flightId: string,
    ) {
        try {
            await this.sagaQueue.add('cancelTicket', {
                sagaId,
                customerId,
                flightId,
            });
            await this.sagaQueue.add('refundPayment', {
                sagaId,
                customerId,
                flightId,
            });
            await this.sagaQueue.add('releaseFlightReservation', {
                sagaId,
                customerId,
                flightId,
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message:
                    'Error al cancelar la transacción. Contacte al soporte.',
            };
        }
    }

    calculateFlightPrice(): number {
        return 100;
    }
}
