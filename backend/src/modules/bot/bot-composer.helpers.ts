import {Injectable} from "@nestjs/common";
import {Composer, Context, Middleware, MiddlewareFn} from 'telegraf';
import {RideStatus} from "../database";

type NonemptyMiddlewares<TContext extends Context = Context> = [Middleware<TContext>, ...Middleware<TContext>[]];

@Injectable()
export class BotComposerHelpers {
    driverOptional<TContext extends Context = Context>(shouldPresent: boolean, ...middlewares: NonemptyMiddlewares<TContext>): MiddlewareFn<TContext> {
        return Composer.optional(
            ({state}) => (state.hasOwnProperty('driver') && state.driver !== null) === shouldPresent,
            ...middlewares
        );
    }

    nonFinishedRidesOptional<TContext extends Context = Context>(shouldPresent: boolean, ...middlewares: NonemptyMiddlewares<TContext>): MiddlewareFn<TContext> {
        return Composer.optional(
            (context) => this.isNonFinishedRides(context) === shouldPresent,
            ...middlewares
        );
    }

    isNonFinishedRides<TContext extends Context = Context>({state}: TContext): boolean {
        return state.hasOwnProperty('rides') && state.rides.some(ride => ride.status !== RideStatus.FINISHED);
    };
}
