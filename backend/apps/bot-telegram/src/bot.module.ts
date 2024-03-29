import { Inject, Module, OnModuleInit, OnApplicationBootstrap, Global } from '@nestjs/common';
import { session } from 'telegraf';
import { DynamicDependencyResolver } from '@app/core/dynamic-dependency-resolver';
import { EnvironmentModule, EnvironmentService } from '@app/core/environment';
import { PrismaModule } from '@app/prisma';
import { ErrorTrackerModule } from '@app/core/error-tracker';
import { BotConnection, IHandleBotError } from './bot.connection';
import { BaseMiddleware, BaseStage, IMiddleware, IMiddlewareNext, ISceneContext } from './base';
import { DriverStateMiddleware, RidesStateMiddleware } from './middlewares';
import { GeneralStage, WelcomeComposer } from './scenes';
import { BotMenuHandler } from './bot-menu.handler';
import { BotComposerHelpers } from './bot-composer.helpers';
import { BotErrorHandler } from './bot-error.handler';
import { BotController } from './bot.controller';
import { MicroservicesModule } from './bot.microservices';

const config = {
    start: WelcomeComposer,
    error: BotErrorHandler,
    middlewares: [DriverStateMiddleware, RidesStateMiddleware],
    stages: [GeneralStage],
};

@Global()
@Module({
    imports: [
        EnvironmentModule,
        PrismaModule,
        ErrorTrackerModule,
        MicroservicesModule,
    ],
    controllers: [
        BotController,
    ],
    providers: [
        BotConnection,
        BotMenuHandler,
        BotComposerHelpers,
        DynamicDependencyResolver,
    ],
    exports: [
        BotConnection,
    ],
})
export class BotModule implements OnModuleInit, OnApplicationBootstrap {
    @Inject()
    private environmentService: EnvironmentService;

    @Inject()
    private connection: BotConnection;

    @Inject()
    private menuHandler: BotMenuHandler;

    @Inject()
    private helpers: BotComposerHelpers;

    @Inject()
    private resolver: DynamicDependencyResolver;

    private middlewares: BaseMiddleware[];
    private stages: BaseStage[];
    private start: IMiddleware;
    private error: IHandleBotError;

    public async onModuleInit(): Promise<void> {
        this.middlewares = await this.resolver.resolve<BaseMiddleware>(config.middlewares);
        this.stages = await this.resolver.resolve<BaseStage>(config.stages);
        this.start = await this.resolver.resolve<IMiddleware>(config.start);
        this.error = await this.resolver.resolve<IHandleBotError>(config.error);
    }

    public async onApplicationBootstrap(): Promise<void> {
        this.connection.create(this.environmentService.telegramBotToken);
        this.connection.use(session());
        this.connection.use(this.middlewares);
        this.connection.use(this.stages);
        this.menuHandler.registerHandlers();
        this.connection.onStart(this.start);
        this.connection.onError(this.error);
        this.showInitial();
        await this.connection.launch();
    }

    private showInitial(): void {
        const displayMenu = async (context: ISceneContext, next: IMiddlewareNext): Promise<void> => {
            if (context.session.hasOwnProperty('__scenes') && context.session.__scenes.current) {
                await next();
            } else {
                await this.menuHandler.showMenu(context);
            }
        };

        this.connection.on('text', this.helpers.driverOptional(false, this.start), displayMenu);
    }
}
