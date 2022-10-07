import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import * as cookieParser from 'cookie-parser';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.setGlobalPrefix('/api/v1');
    app.use(cookieParser(configService.getOrThrow('BACKEND_SECRET')));

    app.enableCors({
        origin: configService.getOrThrow('FRONTEND_ORIGIN'),
        credentials: true
    })

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(8080, '0.0.0.0');
}

bootstrap();
