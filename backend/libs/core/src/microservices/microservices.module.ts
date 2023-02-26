import { DynamicModule, Provider, Type } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EnvironmentModule, EnvironmentService } from '../environment';
import { DynamicDependencyResolver } from '../dynamic-dependency-resolver';
import { MicroserviceApi, MicroserviceKey } from './microservice-api';

type IncludeMicroservices<Key extends MicroserviceKey, ApiClassType extends Type<MicroserviceApi>> = Record<Key, ApiClassType>;

export class MicroservicesFactoryModule {
    public static create<Key extends MicroserviceKey, ApiClassType extends Type<MicroserviceApi>>(microservices: IncludeMicroservices<Key, ApiClassType>): DynamicModule {
        const providers: Provider<MicroserviceApi>[] = [];

        for (const serviceKey in microservices) {
            const ApiClass = microservices[serviceKey] as ApiClassType;

            providers.push({
                provide: ApiClass,
                inject: [EnvironmentService, DynamicDependencyResolver],

                async useFactory(environmentService: EnvironmentService, dependencyResolver: DynamicDependencyResolver) {
                    const api = await dependencyResolver.resolve(ApiClass);
                    api.setClient(ClientProxyFactory.create({
                        transport: Transport.TCP,
                        options: {
                            host: environmentService.getMicroserviceHost(serviceKey),
                            port: 8080,
                        },
                    }));
                    return api;
                },
            });
        }

        return {
            module: MicroservicesFactoryModule,
            global: true,
            imports: [EnvironmentModule],
            providers: providers.concat(DynamicDependencyResolver),
            exports: providers,
        };
    }
}
