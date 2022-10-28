import {Inject, OnModuleInit, OnModuleDestroy, Global, Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {ModuleRef} from "@nestjs/core";
import {DatabaseConnection} from "./database.connection";
import {AdressRepository, DriverRepository, RideCommentRepository, RideRepository, UserRepository} from "./repository";
import {DatabaseSeeds} from "./database.seeds";

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

@Global()
@Module({
    providers: [DatabaseSeeds, ...publicProviders],
    exports: publicProviders
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
    @Inject()
    private moduleRef: ModuleRef;

    @Inject()
    private configService: ConfigService;

    @Inject()
    private connection: DatabaseConnection;

    @Inject()
    private rideRepository: RideRepository;

    async onModuleInit(): Promise<void> {
        await this.connection.connect(this.mongoUrl);

        if (!this.isProduction && await this.isNeedSeeds()) {
            await this.moduleRef.get(DatabaseSeeds).execute();
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.connection.disconnect();
    }

    get mongoUrl(): string {
        return this.configService.getOrThrow('MONGO_URL');
    }

    get isProduction(): boolean {
        return this.configService.get('BACKEND_ENV') === 'PRODUCTION';
    }

    async isNeedSeeds(): Promise<boolean> {
        const rideCount = await this.rideRepository.query.count();
        return rideCount === 0;
    }
}
