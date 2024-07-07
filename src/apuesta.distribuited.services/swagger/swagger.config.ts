import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Booking de Vuelos API')
    .setDescription('Prueba técnica para Apuesta Total')
    .setVersion('1.0')
    .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
    )
    .build();
