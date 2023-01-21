import {INestApplication, INestApplicationContext, INestMicroservice, Type} from "@nestjs/common";
import {TcpOptions, Transport} from "@nestjs/microservices";
import {NestFactory} from "@nestjs/core";

export abstract class ApplicationAdapter<App extends INestApplicationContext> {
    public app: App;

    constructor(protected readonly AppModule: Type<unknown>) {}

    abstract create(): Promise<void>;
    abstract start(): Promise<void>;

    getTcpOptions(): TcpOptions {
        return {
            transport: Transport.TCP,
            options: {host: '0.0.0.0', port: 8080}
        };
    }
}

export class MicroserviceApplicationAdapter extends ApplicationAdapter<INestMicroservice> {
    async create(): Promise<void> {
        this.app = await NestFactory.createMicroservice(this.AppModule, this.getTcpOptions());
    }

    async start(): Promise<void> {
        await this.app.listen();
    }
}

export class HybridApplicationAdapter extends ApplicationAdapter<INestApplication> {
    async create(): Promise<void> {
        this.app = await NestFactory.create(this.AppModule);
        this.app.connectMicroservice(this.getTcpOptions());
    }

    async start(): Promise<void> {
        await this.app.startAllMicroservices();
        await this.app.listen(8081, '0.0.0.0');
    }
}
