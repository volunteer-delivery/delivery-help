const { session, Composer, Telegraf, Scenes } = require('telegraf');
const { showMenu, registerMenuHandlers } = require('./menu');
const { driverStateMiddleware, ridesStateMiddleware, driverComposerOptional } = require('./middlewares');
const newDriverScene = require('./new-driver-scene');
const newRideScene = require('./new-ride-scene');

const welcome = new Composer(
    driverComposerOptional(true, async (ctx) => {
        await showMenu(ctx);
    }),
    driverComposerOptional(false, async (ctx) => {
        await ctx.reply("Вітаємо 👋🏻");
        await ctx.reply(
            "ВолонтерВантаж - це чат-бот для водіїв, які займаються легковими " +
            "та вантажними перевезеннями, і можуть допомогти волонтерам із " +
            "транспортуванням різного роду об'єктів по Україні або з-за кордону."
        );
        await ctx.reply(
            "☝🏻 Щоб долучитися, вам необхідно зареєструвати поїздку " +
            "і прийняти дзвінок від волонтера, який надасть більше деталей."
        );
        await ctx.scene.enter('new-driver-wizard');
    })
);

const stage = new Scenes.Stage(
    [newDriverScene, newRideScene],
    { ttl: 2 * 60 }
);

let bot;

function initializeBotServer(token) {
    bot = new Telegraf(token);

    bot.use(session());
    bot.use(driverStateMiddleware());
    bot.use(ridesStateMiddleware());
    bot.use(stage.middleware());
    registerMenuHandlers(bot, newRideScene);

    // TODO: delete this command before going to production
    bot.command('clearDev',async (ctx) => {
            const { driverModel, rideModel } = require('../models');
            const drivers = await driverModel.find({ _telegramId: { $ne: null } });
            const rm = await rideModel.deleteMany({ driver: {$in: drivers } });
            const dm = await driverModel.deleteMany({ _telegramId: { $ne: null } });
            await ctx.reply(`Deleted rides: ${rm.deletedCount }`);
            await ctx.reply(`Deleted drivers: ${dm.deletedCount}`);
    });


    // TODO: delete this command before going to production
    bot.command('finishRides', async (ctx) => {
        for (ride of ctx.state.rides) {
            if (ride.status != 'FINISHED') {
                ride.status = 'FINISHED';
                await ride.save();
            }
        }
        await ctx.reply('Rides was finishd');
        await showMenu(ctx);
    });

    bot.start(welcome);

    bot.on('text', driverComposerOptional(false, welcome), async (ctx, next) => {
        if (ctx.session.hasOwnProperty('__scenes') && ctx.session.__scenes.current) {
            next();
        } else {
            await showMenu(ctx);
        }
    });

    bot.launch();
};

function notifyNewStatus(ride) {
    let msg;
    switch (ride.status) {
        case 'FINISHED':
            msg = 'Ваша поїздка завершилася. Дякуємо за допомогу! Слава Україні 💙💛';
            break;
        case 'PENDING':
            break;
        case 'ACTIVE':
            msg = 'Інформацію про вашу поїздку оброблено і тепер вона активна. Бажаємо гарної дороги 🙌🏻';
            break;
    }

    if (ride.driver?._telegramId && msg) {
        bot?.telegram.sendMessage(ride.driver?._telegramId, msg);
    }
}

module.exports = {
    initializeBotServer,
    notifyNewStatus
};
