import { Injectable, Type } from '@nestjs/common';
import { Context, Middleware, MiddlewareFn, MiddlewareObj } from 'telegraf';

export type IMiddlewareNext = () => Promise<void>;
export type IInlineMiddleware<TContext extends Context = Context> = MiddlewareFn<TContext>;
export type IMiddleware<TContext extends Context = Context> = Middleware<TContext>;

@Injectable()
export abstract class BaseMiddleware implements MiddlewareObj<Context> {
    private static MIDDLEWARE = true;

    public static isExtends(Class: unknown): Class is Type<BaseMiddleware> {
        return !!(Class as typeof BaseMiddleware).MIDDLEWARE;
    }

    public middleware(): MiddlewareFn<Context> {
        return this.handle.bind(this);
    }

    protected abstract handle(context: Context, next: IMiddlewareNext): Promise<void> | void;
}
