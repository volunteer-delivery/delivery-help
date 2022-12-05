import {Inject, Module, OnModuleInit, OnApplicationBootstrap, Global} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {session} from 'telegraf';
import {BotConnection, IHandleBotError} from "./bot.connection";
import {BaseMiddleware, BaseStage, IMiddleware, IMiddlewareNext} from "./base";
import type {SessionContext} from './base';
import {DriverStateMiddleware, RidesStateMiddleware} from "./middlewares";
import {GeneralStage, WelcomeComposer} from "./scenes";
import {DynamicDependencyResolver} from "../common";
import {BotMenuHandler} from "./bot-menu.handler";
import {BotComposerHelpers} from "./bot-composer.helpers";
import {BotErrorHandler} from "./bot-error.handler";

const config = {
    start: WelcomeComposer,
    error: BotErrorHandler,
    middlewares: [DriverStateMiddleware, RidesStateMiddleware],
    stages: [GeneralStage]
}

@Global()
@Module({
    providers: [
        BotConnection,
        BotMenuHandler,
        BotComposerHelpers,
        DynamicDependencyResolver
    ],
    exports: [
        BotConnection
    ]
})
export class BotModule implements OnModuleInit, OnApplicationBootstrap {
    @Inject()
    private configService: ConfigService

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

    async onApplicationBootstrap(): Promise<void> {
        if (this.token) await this.runBot();
    }

    get token(): string | null {
        return this.configService.get('TELEGRAM_BOT_TOKEN');
    }

    async onModuleInit(): Promise<void> {
        this.middlewares = await this.resolver.resolve<BaseMiddleware>(config.middlewares);
        this.stages = await this.resolver.resolve<BaseStage>(config.stages);
        this.start = await this.resolver.resolve<IMiddleware>(config.start);
        this.error = await this.resolver.resolve<IHandleBotError>(config.error);
    }

    async runBot() {
        this.connection.create(this.token);
        this.connection.use(session())
        this.connection.use(this.middlewares);
        this.connection.use(this.stages);
        this.menuHandler.registerHandlers();
        this.connection.onStart(this.start);
        this.connection.onError(this.error);
        this.showInital();
        await this.connection.launch();
    }

    private showInital() {
        const displayMenu = async (context: SessionContext<any>, next: IMiddlewareNext) => {
            if (context.session.hasOwnProperty('__scenes') && context.session.__scenes.current) {
                await next();
            } else {
                await this.menuHandler.showMenu(context);
            }
        }

        this.connection.on('text', this.helpers.driverOptional(false, this.start), displayMenu);
    }
}
