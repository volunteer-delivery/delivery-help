import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceKey } from '../microservices';
import { Environment, IEnvironmentVars } from './environment-vars';

export class EnvironmentService {
    @Inject()
    private configService: ConfigService<IEnvironmentVars>;

    public get telegramBotToken(): string {
        return this.configService.getOrThrow('TELEGRAM_BOT_TOKEN');
    }

    public get secret(): string {
        return this.configService.getOrThrow('BACKEND_SECRET');
    }

    public get frontendOrigin(): string {
        return this.configService.getOrThrow('FRONTEND_ORIGIN');
    }

    public getMicroserviceHost(microservice: MicroserviceKey): string {
        return this.configService.getOrThrow(`BACKEND_${microservice}_HOST`);
    }

    public get env(): Environment {
        return this.configService.getOrThrow('BACKEND_ENV');
    }

    public get isDevelopment(): boolean {
        return this.env === Environment.DEVELOPMENT;
    }

    public get isStaging(): boolean {
        return this.env === Environment.STAGING;
    }

    public get isProduction(): boolean {
        return this.env === Environment.PRODUCTION;
    }

    public get authExpiration(): number {
        return this.configService.getOrThrow<number>('BACKEND_AUTH_EXPIRATION', { infer: true });
    }
}
