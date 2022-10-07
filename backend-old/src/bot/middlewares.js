const { Composer } = require('telegraf');
const { driverModel, rideModel } = require('../models');

const driverStateMiddleware = () => {
    return async(ctx, next) => {
        let telegramId = ctx.chat.id;
        ctx.state.driver = await driverModel.findOne({ _telegramId: telegramId });
        return next();
    };
};

const ridesStateMiddleware = () => {
    return async (ctx, next) => {
        if (ctx.state.driver) {
            ctx.state.rides = await rideModel.find({ driver: ctx.state.driver });
        } else {
            ctx.state.rides = [];
        }
        return next();
    };
}

const driverComposerOptional = (shouldDriverPresent, ...fns) => 
    Composer.optional(
        ctx => (ctx.state.hasOwnProperty('driver') && ctx.state.driver !== null) == shouldDriverPresent,
        ...fns
    );

const isNonFinisehdRides = (ctx) => {
    return ctx.state.hasOwnProperty('rides') && ctx.state.rides.some(ride => ride.status != 'FINISHED');
};

const nonFinishedRidesComposerOptional = (shouldPresentNonFinishedRides, ...fns) =>
    Composer.optional(
        ctx => (isNonFinisehdRides(ctx) == shouldPresentNonFinishedRides),
        ...fns
    );

module.exports = {
    driverStateMiddleware,
    ridesStateMiddleware,
    driverComposerOptional,
    nonFinishedRidesComposerOptional,
    isNonFinisehdRides
};
