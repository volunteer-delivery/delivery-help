import {Composer, MiddlewareObj} from "telegraf";
import {Inject, Injectable, OnModuleInit, Type} from "@nestjs/common";
import {ISceneContext} from "./base-scene";
import {BaseMiddleware, IInlineMiddleware} from "./base-middleware";
import {DynamicDependencyResolver} from "@app/core/dynamic-dependency-resolver";
import {ComposerMetadata, IComposeAction, IComposeEvent} from "./composer-metadata";

export type IComposeMiddleware = Type<BaseMiddleware> | IInlineMiddleware<ISceneContext>;
export type IComposeMatchedContext = { match: RegExpExecArray };

type IResolvedMiddleware = BaseMiddleware | IInlineMiddleware<ISceneContext>;

export function OnEvent(type: IComposeEvent): MethodDecorator {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        ComposerMetadata.resolve(target.constructor).addEvent(type, descriptor.value);
    }
}

export function OnAction(action: IComposeAction): MethodDecorator {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        ComposerMetadata.resolve(target.constructor).addAction(action, descriptor.value);
    }
}

@Injectable()
export abstract class BaseComposer implements MiddlewareObj<ISceneContext>, OnModuleInit {
    private static COMPOSER = true;

    static isExtends(Class: any): Class is Type<BaseComposer> {
        return !!Class.COMPOSER
    }

    private readonly metadata = ComposerMetadata.resolve(this.constructor);
    private middlewares: IResolvedMiddleware[] = [];
    private composer: Composer<ISceneContext>;

    @Inject()
    private resolver: DynamicDependencyResolver;

    async onModuleInit(): Promise<void> {
        this.middlewares = await Promise.all(this.defineMiddlewares().map(this.resolveMiddleware.bind(this)));
    }

    private async resolveMiddleware(Middleware: IComposeMiddleware): Promise<IResolvedMiddleware> {
        if (BaseMiddleware.isExtends(Middleware)) {
            return await this.resolver.resolve<BaseMiddleware>(Middleware);
        }
        return Middleware.bind(this);
    }

    middleware(): IInlineMiddleware<ISceneContext> {
        this.composer = new Composer(...this.middlewares);

        for (const event of this.metadata.events) {
            this.composer.on(event.key as IComposeEvent, event.handler.bind(this));
        }

        for (const action of this.metadata.actions) {
            this.composer.action(action.key, action.handler.bind(this))
        }

        return this.composer.middleware();
    }

    protected defineMiddlewares(): IComposeMiddleware[] {
        return [];
    }
}
