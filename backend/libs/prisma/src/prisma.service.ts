import {INestApplicationContext, Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {EnvironmentService} from "@app/core/environment";
import { PrismaClient, Prisma } from './client';

export type UniqueConstrainError = Prisma.PrismaClientKnownRequestError & {
    meta: { target: string[] };
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly isLoggerEnabled: boolean;

    constructor(environmentService: EnvironmentService) {
        const isLoggerEnabled = environmentService.getString('BACKEND_ENV') !== 'PRODUCTION';
        super(isLoggerEnabled ? { log: [{ level: 'query', emit: 'event' }] } : {});

        this.isLoggerEnabled = isLoggerEnabled;
    }

    public async onModuleInit(): Promise<void> {
        await this.$connect();
        if (this.isLoggerEnabled) this.useLogger();
    }

    public async enableShutdownHooks(app: INestApplicationContext): Promise<void> {
        this.$on('beforeExit', async () => await app.close());
    }

    private useLogger(): void {
        // @ts-ignore
        this.$on<'query'>('query', (event) => {
            console.log('');
            console.log(`Time: ${event.timestamp}`);
            console.log(`Query: ${event.query}`);
            console.log(`Params: ${event.params}`);
            console.log(`Duration: ${event.duration}ms`);
        });
    }
}
