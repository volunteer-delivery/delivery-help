import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import {PrismaService} from "@app/prisma";
import {ErrorTracker, ErrorTrackerInterceptor} from "@app/core/error-tracker";
import * as cookieParser from 'cookie-parser';
import {MainModule} from './main.module';
import {AuthGuard} from "./modules/auth";
import {EnvironmentService} from "@app/core/environment";

async function bootstrap() {
    ErrorTracker.init();

    const app = await NestFactory.create(MainModule);

    const prisma = app.get(PrismaService);
    await prisma.enableShutdownHooks(app);

    const environmentService = app.get(EnvironmentService);

    app.setGlobalPrefix('/api/v1');
    app.use(cookieParser(environmentService.getString('BACKEND_SECRET')));
    app.useGlobalGuards(app.get(AuthGuard));

    app.enableCors({
        origin: environmentService.getString('FRONTEND_ORIGIN'),
        credentials: true
    })

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(app.get(ErrorTrackerInterceptor));

    await app.listen(8080, '0.0.0.0');
}

bootstrap();
