import {FeatureType, ResourceOptions, ResourceWithOptions} from "adminjs";
import {Prisma, PrismaClient} from "../prisma";

export abstract class AdminResource {
    protected abstract model: Prisma.ModelName;
    protected options: ResourceOptions = {};
    protected features: FeatureType[] = [];

    constructor(protected prismaClient: PrismaClient) {}

    build(): ResourceWithOptions {
        return {
            resource: {
                model: (this.prismaClient as any)._baseDmmf.modelMap[this.model],
                client: this.prismaClient
            },
            options: this.options,
            features: this.features
        }
    }
}
