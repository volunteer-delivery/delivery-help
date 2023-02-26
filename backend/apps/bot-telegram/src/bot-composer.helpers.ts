import { Injectable } from '@nestjs/common';
import { Composer, Context, Middleware, MiddlewareFn } from 'telegraf';
import { RideStatus } from '@app/prisma';

type NonemptyMiddlewares<TContext extends Context = Context> = [Middleware<TContext>, ...Middleware<TContext>[]];

@Injectable()
export class BotComposerHelpers {
    public driverOptional<TContext extends Context = Context>(shouldPresent: boolean, ...middlewares: NonemptyMiddlewares<TContext>): MiddlewareFn<TContext> {
        return Composer.optional(
            ({ state }) => (state.hasOwnProperty('driver') && state.driver !== null) === shouldPresent,
            ...middlewares,
        );
    }

    public nonFinishedRidesOptional<TContext extends Context = Context>(shouldPresent: boolean, ...middlewares: NonemptyMiddlewares<TContext>): MiddlewareFn<TContext> {
        return Composer.optional(
            (context) => this.isNonFinishedRides(context) === shouldPresent,
            ...middlewares,
        );
    }

    public isNonFinishedRides<TContext extends Context = Context>({ state }: TContext): boolean {
        return state.hasOwnProperty('rides') && state.rides.some((ride) => ride.status !== RideStatus.FINISHED);
    }
}
