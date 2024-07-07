import { Flight } from 'src/apuesta.domain.entities/models/flight.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Flight)
export class FlightDapperRepository extends Repository<Flight> {}
