import {DynamicModule, Inject, OnModuleInit, OnModuleDestroy} from "@nestjs/common";
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

export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
    static forRoot = (): DynamicModule => ({
        global: true,
        module: DatabaseModule,
        providers: [DatabaseSeeds, ...publicProviders],
        exports: publicProviders
    })

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
            const seeds = await this.moduleRef.resolve(DatabaseSeeds);
            await seeds.execute();
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.connection.disconnect();
    }

    get mongoUrl(): string {
        return this.configService.getOrThrow('MONGO_URL');
    }

    get isProduction(): boolean {
        return this.configService.get('BACKEND_ENV') === 'production';
    }

    async isNeedSeeds(): Promise<boolean> {
        const rideCount = await this.rideRepository.query.count();
        return rideCount === 0;
    }
}
