import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CustomersService } from 'src/apuesta.application/services/customer.service';
import { FlightsService } from 'src/apuesta.application/services/flight.service';
import { PaymentsService } from 'src/apuesta.application/services/payment.service';
import { ReservationService } from 'src/apuesta.application/services/reservation.service';

@Processor('saga_queue')
export class BookingProcessor {
    constructor(
        private readonly flightsService: FlightsService,
        private readonly reservationService: ReservationService,
        private readonly paymentsService: PaymentsService,
        private readonly customerService: CustomersService,
    ) {}

    @Process('processPayment')
    async handleProcessPayment(job: Job) {
        const { sagaId, request, amount } = job.data;
        await this.paymentsService.processPayment(sagaId, request, amount);
    }

    @Process('reserveSeat')
    async handleReserveSeat(job: Job) {
        const { sagaId, request } = job.data;
        await this.reservationService.paidSeat(sagaId, request);
    }

    @Process('issueTicket')
    async handleIssueTicket(job: Job) {
        const { sagaId, idCustomer, idFlight } = job.data;

        const flight = await this.flightsService.findOne(idFlight);
        const customer = await this.customerService.findOne(idCustomer);
        const ticket = {
            departure: flight.departure,
            departureTime: flight.departureTime,
            arrival: flight.arrival,
            arrivalTime: flight.arrivalTime,
            customer: customer.userName,
            processId: sagaId,
        };
        return ticket;
    }

    @Process('cancelTicket')
    async handleCancelTicket(job: Job) {
        const { sagaId, request } = job.data;

        await this.reservationService.cancelSeat(sagaId, request);
    }

    @Process('refundPayment')
    async handleRefundPayment(job: Job) {
        const { customerId, idSeat } = job.data;
        const pricing = await this.reservationService.findOne(idSeat);

        await this.paymentsService.refundPayment(customerId, pricing.price);
    }

    @Process('releaseFlightReservation')
    async handleReleaseFlightReservation(job: Job) {
        const { sagaId, customerId, flightId } = job.data;
        await this.flightsService.releaseFlightReservation(
            sagaId,
            customerId,
            flightId,
        );
    }
}
