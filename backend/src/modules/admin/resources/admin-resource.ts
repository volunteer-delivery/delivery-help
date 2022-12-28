import {Inject, Injectable} from "@nestjs/common";
import {FeatureType, ResourceOptions, ResourceWithOptions} from "adminjs";
import {Prisma, PrismaService} from "../../prisma";

@Injectable()
export abstract class AdminResource {
    protected abstract model: Prisma.ModelName;
    protected options: ResourceOptions = {};
    protected features: FeatureType[] = [];

    @Inject()
    protected prismaService: PrismaService

    build(): ResourceWithOptions {
        return {
            resource: {
                model: (this.prismaService as any)._baseDmmf.modelMap[this.model],
                client: this.prismaService
            },
            options: this.options,
            features: this.features
        }
    }
}
