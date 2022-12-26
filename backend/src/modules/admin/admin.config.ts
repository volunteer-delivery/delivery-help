import {CurrentAdmin} from "adminjs";
import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {AdminModuleOptions} from "@adminjs/nestjs";
import {ConfigService} from "@nestjs/config";
import {Env} from "../common/types";

@Injectable()
export class AdminConfig implements OnModuleInit {
    @Inject()
    private configService: ConfigService;
    private adminUser: CurrentAdmin;

    onModuleInit(): void {
        const email = this.configService.getOrThrow<string>('BACKEND_ADMIN_EMAIL');
        const password = this.configService.getOrThrow<string>('BACKEND_ADMIN_PASSWORD');
        this.adminUser = { email, password };
    }

    build(): AdminModuleOptions {
        const secret = this.configService.getOrThrow('BACKEND_SECRET');
        const env = this.configService.getOrThrow<Env>('BACKEND_ENV');

        const options: AdminModuleOptions =  {
            adminJsOptions: {
                rootPath: '/admin',
                resources: [],
            }
        }

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
}
