const { session, Composer, Telegraf, Scenes } = require('telegraf');
const Calendar = require('telegraf-calendar-telegram');
const { driverStateMiddleware, driverComposerOptional } = require('./middlewares');
const newDriverScene = require('./new-driver-scene');
const newRideScene = require('./new-ride-scene');

const welcome = new Composer(
    driverComposerOptional(true, async (ctx) => {
        await ctx.reply('/ride - Поїхали!');
        await ctx.reply('/profile - Мій профіль');
    }),
    driverComposerOptional(false, async (ctx) => {
        await ctx.reply('Для початку работи, представтеся');
        await ctx.scene.enter('new-driver-wizard');
    })
);

const stage = new Scenes.Stage(
    [newDriverScene, newRideScene],
    { ttl: 2 * 60 }
);

function initializeBotServer(token) {
    const bot = new Telegraf(token);

    const calendar = new Calendar(bot);
    // calendar.setDateListener((ctx, date) => { console.log(`SET DATE ${date}`)});
    bot.use(async (ctx, next) => {
        ctx.calendar = calendar;
        return next()
    });

    bot.use(session());
    bot.use(driverStateMiddleware());
    bot.use(stage.middleware());

    bot.command('ride', (ctx) => ctx.scene.enter('new-ride-wizard'));
    bot.command('profile', driverComposerOptional(true, async (ctx, next) => {
        await ctx.reply(`Ім'я: ${ctx.state.driver.name}`);
        await ctx.reply(`Телефон: ${ctx.state.driver.phone}`);
        return next();
    }), welcome);

    // TODO: delete this command before going to production
    bot.command('clearDev', async (ctx) => {
        const { driverModel, rideModel } = require('../models');
        const drivers = await driverModel.find({ _telegramId: { $ne: null } });
        const rm = await rideModel.deleteMany({ driver: {$in: drivers } });
        const dm = await driverModel.deleteMany({ _telegramId: { $ne: null } });
        ctx.reply(`Deleted rides: ${rm.deletedCount }`)
        ctx.reply(`Deleted drivers: ${dm.deletedCount}`);
    });

    bot.help(welcome);
    bot.start(welcome);

    bot.on('text', driverComposerOptional(false, welcome), async (ctx, next) => {
        if (ctx.session.hasOwnProperty('__scenes') && ctx.session.__scenes.current) {
            next();
        } else {
            await ctx.reply('Не розумію вас. Спробуйте /help');
        }
    });

    bot.launch();
};

module.exports = { initializeBotServer };
