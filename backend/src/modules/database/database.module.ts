import {DynamicModule, Inject, OnModuleInit} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {DatabaseConnection} from "./database.connection";
import {AdressRepository, DriverRepository, RideCommentRepository, RideRepository, UserRepository} from "./repository";

export const repositories = [
    UserRepository,
    AdressRepository,
    DriverRepository,
    RideCommentRepository,
    RideRepository
];

const publicProviders = [
    DatabaseConnection,
    ...repositories
];

export class DatabaseModule implements OnModuleInit {
    static forRoot = (): DynamicModule => ({
        global: true,
        module: DatabaseModule,
        providers: publicProviders,
        exports: publicProviders
    })

    @Inject()
    private connection: DatabaseConnection;

    @Inject()
    private configService: ConfigService;

    async onModuleInit(): Promise<void> {
        const url = this.configService.getOrThrow('MONGO_URL');
        await this.connection.connect(url);
    }
}
