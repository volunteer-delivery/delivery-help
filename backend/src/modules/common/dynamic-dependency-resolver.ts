import {Inject, Injectable, OnModuleInit, Type} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";

@Injectable()
export class DynamicDependencyResolver {
    @Inject()
    private moduleRef: ModuleRef;

    resolve<Provider>(provider: Type<Provider>): Promise<Provider>;
    resolve<Provider>(providers: Type<Provider>[]): Promise<Provider[]>;
    resolve<Provider>(providers: Type<Provider> | Type<Provider>[]): Promise<Provider | Provider[]> {
        if (!Array.isArray(providers)) {
            return this.resolveDependency(providers);
        }
        return Promise.all(providers.map(this.resolveDependency.bind(this)));
    }

    private resolveDependency<Provider>(provider: Type<Provider>): Promise<Provider> {
        return this.moduleRef.create<Provider>(provider).then(this.runOnInitHook.bind(this));
    }

    private async runOnInitHook<Provider>(provider: Provider): Promise<Provider> {
        await (provider as OnModuleInit).onModuleInit?.()
        return provider;
    }
}
