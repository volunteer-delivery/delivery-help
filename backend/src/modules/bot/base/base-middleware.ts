import {Injectable, Type} from "@nestjs/common";
import {Context, Middleware, MiddlewareFn, MiddlewareObj} from "telegraf";

export type IMiddlewareNext = () => Promise<void>;
export type IInlineMiddleware<TContext extends Context = Context> = MiddlewareFn<TContext>;
export type IMiddleware<TContext extends Context = Context> = Middleware<TContext>;

@Injectable()
export abstract class BaseMiddleware implements MiddlewareObj<Context> {
    private static MIDDLEWARE = true;

    static isExtends(Class: any): Class is Type<BaseMiddleware> {
        return !!Class.MIDDLEWARE;
    }

    middleware() {
        return this.handle.bind(this);
    }

    abstract handle(context: Context, next: IMiddlewareNext): Promise<void> | void;
}
