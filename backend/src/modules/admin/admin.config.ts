import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import AdminJS, {CurrentAdmin, ResourceWithOptions} from "adminjs";
import {AdminModuleOptions} from "@adminjs/nestjs";
import * as AdminJSPrisma from '@adminjs/prisma'
import {ConfigService} from "@nestjs/config";
import {Env} from "../common/types";
import {PrismaService} from "../prisma";
import {
    AddressResource,
    AdminResource,
    DriverResource,
    RideResource,
    UserResource
} from "./resources";
import {DynamicDependencyResolver} from "../common";

const resources = [
    UserResource,
    DriverResource,
    RideResource,
    AddressResource
];

@Injectable()
export class AdminConfig implements OnModuleInit {
    @Inject()
    private configService: ConfigService;

    @Inject()
    private prismaService: PrismaService

    @Inject()
    private dependencyResolver: DynamicDependencyResolver;

    private adminUser: CurrentAdmin;

    onModuleInit(): void {
        const email = this.configService.getOrThrow<string>('BACKEND_ADMIN_EMAIL');
        const password = this.configService.getOrThrow<string>('BACKEND_ADMIN_PASSWORD');
        this.adminUser = { email, password };
    }

    async build(): Promise<AdminModuleOptions> {
        this.registerPrisma();

        const options: AdminModuleOptions =  {
            adminJsOptions: {
                rootPath: '/admin',
                branding: {
                    companyName: 'Волонтер Вантаж ~ Адмін',
                    favicon: '/favicon.ico'
                },
                resources: await this.buildResources()
            }
        }

        const secret = this.configService.getOrThrow('BACKEND_SECRET');
        const env = this.configService.getOrThrow<Env>('BACKEND_ENV');

        if (env !== Env.DEVELOPMENT) {
            Object.assign<AdminModuleOptions, Omit<AdminModuleOptions, 'adminJsOptions'>>(options, {
                auth: {
                    authenticate: this.authenticate.bind(this),
                    cookieName: 'adminjs',
                    cookiePassword: secret
                },
                sessionOptions: {
                    resave: true,
                    saveUninitialized: true,
                    secret: secret
                }
            })
        }

        return options;
    }

    private async authenticate(email: string, password: string): Promise<CurrentAdmin> {
        if (email !== this.adminUser.email) return null;
        if (password !== this.adminUser.password) return null;
        return this.adminUser
    }

    private registerPrisma() {
        AdminJS.registerAdapter(AdminJSPrisma)
    }

    private async buildResources(): Promise<ResourceWithOptions[]> {
        const loaded: AdminResource[] = await this.dependencyResolver.resolve<AdminResource>(resources);
        return loaded.map(resource => resource.build());
    }
}
