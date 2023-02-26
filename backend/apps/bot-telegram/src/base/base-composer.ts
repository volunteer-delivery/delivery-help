import { Composer, MiddlewareObj } from 'telegraf';
import { Inject, Injectable, OnModuleInit, Type } from '@nestjs/common';
import { DynamicDependencyResolver } from '@app/core/dynamic-dependency-resolver';
import { ISceneContext } from './base-scene';
import { BaseMiddleware, IInlineMiddleware } from './base-middleware';
import { ComposerMetadata, IComposeAction, IComposeEvent, IComposeHandler } from './composer-metadata';

export type IComposeMiddleware = Type<BaseMiddleware> | IInlineMiddleware<ISceneContext>;
export type IComposeMatchedContext = { match: RegExpExecArray };

type IResolvedMiddleware = BaseMiddleware | IInlineMiddleware<ISceneContext>;

export function OnEvent(type: IComposeEvent): MethodDecorator {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<unknown>) => {
        ComposerMetadata.resolve(target.constructor).addEvent(type, descriptor.value as IComposeHandler);
    };
}

export function OnAction(action: IComposeAction): MethodDecorator {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<unknown>) => {
        ComposerMetadata.resolve(target.constructor).addAction(action, descriptor.value as IComposeHandler);
    };
}

@Injectable()
export abstract class BaseComposer implements MiddlewareObj<ISceneContext>, OnModuleInit {
    private static COMPOSER = true;

    public static isExtends(Class: unknown): Class is Type<BaseComposer> {
        return !!(Class as typeof BaseComposer).COMPOSER;
    }

    private readonly metadata = ComposerMetadata.resolve(this.constructor);
    private middlewares: IResolvedMiddleware[] = [];
    private composer: Composer<ISceneContext>;

    @Inject()
    private resolver: DynamicDependencyResolver;

    public async onModuleInit(): Promise<void> {
        this.middlewares = await Promise.all(this.defineMiddlewares().map(this.resolveMiddleware.bind(this)));
    }

    private async resolveMiddleware(Middleware: IComposeMiddleware): Promise<IResolvedMiddleware> {
        if (BaseMiddleware.isExtends(Middleware)) {
            return await this.resolver.resolve<BaseMiddleware>(Middleware);
        }
        return Middleware.bind(this);
    }

    public middleware(): IInlineMiddleware<ISceneContext> {
        this.composer = new Composer(...this.middlewares) as Composer<ISceneContext>;

        for (const event of this.metadata.events) {
            this.composer.on(event.key as IComposeEvent, event.handler.bind(this));
        }

        for (const action of this.metadata.actions) {
            this.composer.action(action.key, action.handler.bind(this));
        }

        return this.composer.middleware();
    }

    protected defineMiddlewares(): IComposeMiddleware[] {
        return [];
    }
}
