import {Composer, MiddlewareObj, Types} from "telegraf";
import {Inject, Injectable, OnModuleInit, Type} from "@nestjs/common";
import {ISceneContext} from "./base-scene";
import {BaseMiddleware, IInlineMiddleware} from "./base-middleware";
import {DynamicDependencyResolver} from "../../common";

export type IComposeMiddlewares = Array<Type<BaseMiddleware> | IInlineMiddleware<ISceneContext>>;
export type IComposeUpdate = Types.UpdateType | Types.MessageSubType
export type IComposeHandler = (context: ISceneContext) => void | Promise<void>;
export type IComposeMatchedContext = { match: RegExpExecArray };

export interface IComposeActionHandler {
    pattern: boolean,
    handler: IComposeHandler
}

@Injectable()
export abstract class BaseComposer implements MiddlewareObj<ISceneContext>, OnModuleInit {
    private static COMPOSER = true;

    static isExtends(Class: any): Class is Type<BaseComposer> {
        return !!Class.COMPOSER
    }

    private middlewares: Array<BaseMiddleware | IInlineMiddleware<ISceneContext>> = [];
    private composer: Composer<ISceneContext>;

    @Inject()
    private resolver: DynamicDependencyResolver;

    async onModuleInit(): Promise<void> {
        const middlewares = this.defineMiddlewares();
        const classMiddlewares = [];

        for (const Middleware of middlewares) {
            BaseMiddleware.isExtends(Middleware) ? classMiddlewares.push(Middleware) : this.middlewares.push(Middleware.bind(this))
        }

        this.middlewares.push(...await this.resolver.resolve<BaseMiddleware>(classMiddlewares))
    }

    middleware(): IInlineMiddleware<ISceneContext> {
        this.composer = new Composer(...this.middlewares);

        for (const [type, handler] of Object.entries(this.defineHandlers())) {
            this.composer.on(type as IComposeUpdate, handler.bind(this));
        }

        for (const [type, handler] of Object.entries(this.defineActions())) {
            const config: IComposeActionHandler = typeof handler === 'function' ? { handler, pattern: false } : handler;
            const trigger = config.pattern ? new RegExp(type) : type;
            this.composer.action(trigger, config.handler.bind(this));
        }

        return this.composer.middleware();
    }

    protected defineMiddlewares(): IComposeMiddlewares {
        return [];
    }

    protected defineHandlers(): Partial<Record<IComposeUpdate, IComposeHandler>> {
        return {};
    }

    protected defineActions(): Partial<Record<string, IComposeHandler | IComposeActionHandler>> {
        return {};
    }
}