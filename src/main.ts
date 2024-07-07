import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { corsOptions } from './apuesta.distribuited.services/cors/cors.config';
import { swaggerConfig } from './apuesta.distribuited.services/swagger/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cors(corsOptions));

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
