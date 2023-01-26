export enum Environment {
    DEVELOPMENT = 'DEVELOPMENT',
    STAGING = 'STAGING',
    PRODUCTION = 'PRODUCTION',
}

export interface IEnvironmentVars {
    FRONTEND_ORIGIN: string;
    POSTGRES_URL: string;
    TELEGRAM_BOT_TOKEN: string;
    BACKEND_ENV: Environment;
    BACKEND_SECRET: string;
    BACKEND_AUTH_EXPIRATION: number;
    BACKEND_BUGSNAG_KEY: string;
    BACKEND_WEBSOCKET_HOST: string;
    BACKEND_BOT_TELEGRAM_HOST: string;
}
