import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { BookingModule } from './apuesta.application/hubs/booking.module';
import { FlightsModule } from './apuesta.application/hubs/flight.module';
import { CustomersModule } from './apuesta.application/hubs/customers.module';
import { PaymentsModule } from './apuesta.application/hubs/payments.module';
import { DataBaseModule } from './apuesta.infraestructure.data/connections/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
    DEFAULT_STRATEGY,
    EXPIRES_TIME,
    JWT_PASS,
} from './apuesta.infraestructure.cross.cuting/constants/jwt.const';
import { JwtStrategy } from './apuesta.distribuited.services/auth/auth.strategy';
import { ReservationModule } from './apuesta.application/hubs/reservation.module';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
        PassportModule.register({ defaultStrategy: DEFAULT_STRATEGY }),
        JwtModule.register({
            secret: JWT_PASS,
            signOptions: { expiresIn: EXPIRES_TIME },
        }),
        BookingModule,
        FlightsModule,
        CustomersModule,
        PaymentsModule,
        ReservationModule,
        DataBaseModule,
    ],
    controllers: [AppController],
    providers: [
        JwtStrategy,
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
})
export class AppModule {}
