import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import * as cookieParser from 'cookie-parser';
import {MainModule} from './main.module';
import {AuthGuard} from "./modules/auth";
import {ErrorTracker, ErrorTrackerInterceptor} from "./modules/error-tracker";

async function bootstrap() {
    ErrorTracker.init();

    const app = await NestFactory.create(MainModule);
    const configService = app.get(ConfigService);

    app.setGlobalPrefix('/api/v1');
    app.use(cookieParser(configService.getOrThrow('BACKEND_SECRET')));
    app.useGlobalGuards(app.get(AuthGuard));

    app.enableCors({
        origin: configService.getOrThrow('FRONTEND_ORIGIN'),
        credentials: true
    })

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(app.get(ErrorTrackerInterceptor));

    await app.listen(8080, '0.0.0.0');
}

bootstrap();
