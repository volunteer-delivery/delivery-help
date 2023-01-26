import {Transport} from '@nestjs/microservices';
import {INestApplicationContext} from '@nestjs/common';
import {MicroserviceKey} from "./microservice-api";
import {ApplicationAdapter, StarterExtension} from "./extensions";

export interface MicroserviceStarterConfig<Key extends MicroserviceKey, App extends INestApplicationContext> {
    name: Key;
    applicationAdapter: ApplicationAdapter<App>;
    extensions?: StarterExtension<App>[];
}

export class MicroserviceStarter<Key extends MicroserviceKey, App extends INestApplicationContext> {
    public static async run<Key extends MicroserviceKey, App extends INestApplicationContext>(config: MicroserviceStarterConfig<Key, App>): Promise<void> {
        await new MicroserviceStarter(config).run();
    }

    constructor(
        private readonly config: MicroserviceStarterConfig<Key, App>,
    ) {}

    private async run(): Promise<void> {
        await this.config.applicationAdapter.create();

        await this.applyExtensions((extension) => {
            extension.app = this.config.applicationAdapter.app
        });

        await this.applyExtensions((extension) => extension.beforeStart());
        await this.config.applicationAdapter.start();
    }

    private async applyExtensions(apply: (extension: StarterExtension<App>) => void | Promise<void>): Promise<void> {
        for (const extension of this.config.extensions || []) await apply(extension);
    }
}
