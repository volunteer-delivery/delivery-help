const { Composer } = require('telegraf');
const { driverModel } = require('../models');

const driverStateMiddleware = () => {
    return async(ctx, next) => {
        let telegramId = ctx.chat.id;
        ctx.state.driver = await driverModel.findOne({ _telegramId: telegramId });
        return next();
    };
};

const driverComposerOptional = (shouldDriverPresent, ...fns) => 
    Composer.optional((ctx) => (ctx.state.hasOwnProperty('driver') && ctx.state.driver !== null) == shouldDriverPresent, ...fns);

module.exports = {
    driverStateMiddleware,
    driverComposerOptional
};
