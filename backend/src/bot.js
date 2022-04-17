const { Telegraf, session } = require('telegraf');
const { driverModel, telegramSessionModel } = require('./models');

function sessionMiddleware(type) {
    return async (ctx, next) => {
        let telegramId;
        if (type == 'action') {
            telegramId = ctx.update.callback_query.from.id;
        } else if (type == 'chat') {
            telegramId = ctx.message.chat.id;
        } else {
            telegramId = ctx.message.chat.id;
        }
        ctx.driver = await driverModel.findOne({ _telegramId: telegramId });
        let session = await telegramSessionModel.findOne({ _telegramId: telegramId });
        if (!session) {
            session = await telegramSessionModel.create({ _telegramId: telegramId, process: 'IDLE', step: 0 });
        }
        ctx.session = session;
        return next();
    }
}

function afterButton(ctx, next) {
    ctx.deleteMessage();
    return next();
}

function helpRoute(ctx) {
    if (ctx.driver) {
        ctx.reply('/ride - Для того щоб заявити намір об поїздки');
        ctx.reply('/profile - Для того щоб перевірити свій профіль');
    } else {
        ctx.reply('Для роботи з цим ботом вам потрібно зареєструватися');
        ctx.reply('Запустіть команду /new');
    }
}

function showMessage(ctx, next) {
    const messagesDict = {
        "IDLE": {
            0: () => helpRoute(ctx),
        },
        "USER_REGISTRATION": {
            0: () => ctx.reply('Нам потрібне ваше ім\'я', {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: `Використати ${ctx.message.chat.first_name} ${ctx.message.chat.last_name}`, callback_data: "USE_PROFILE_NAME" } ],
                        [ { text: "Ввести ім\'я самостійно", callback_data: "ENTER_NAME" } ]
                    ]
                }
            }),
            1: () => ctx.reply('Введіть ваше ім\'я'),
            2: () => ctx.reply('Введіть ваш номер телефону')
        },
        "RIDE_REGISTRATION": {

        }
    }
    messagesDict[ctx.session.process][ctx.session.step]();

    return next();
}

function setProcessAndStepMiddleware(process, step) {
    return async (ctx, next) => {
        ctx.session.process = process;
        ctx.session.step = step;
        await ctx.session.save();
        return next();
    }
}

function profileRoute(ctx) {
    if (ctx.driver) {
        ctx.reply(`Ім'я: ${ctx.driver.name}`);
        ctx.reply(`Телефон: ${ctx.driver.phone}`);
    } else {
        ctx.reply('Команда доступна лише для зареєстрованих водіїв');
    }
}

async function newUserRoute(ctx, next) {
    ctx.session.process = 'USER_REGISTRATION';
    ctx.session.step = 0;
    await ctx.session.save();

    if (ctx.driver) {
        ctx.reply('Реестрація доступна лише новим користувачам');
    } else {
        showMessage(ctx, next);
    }
}

async function clearDev(ctx) {
    console.log('clear sessio!')
    if (ctx.driver) {
        ctx.driver._telegramId = null;
        await ctx.driver.save();
    }
    ctx.session.remove();
}

async function processMessage(ctx, next) {
    console.log('process', ctx.session.step);
    const actionDict = {
        "IDLE": {
            0: async () => { showMessage(ctx, next); }
        },
        "USER_REGISTRATION": {
            0: async () => { return next(); },
            1: async () => {
                ctx.session.name = ctx.message.text;
                ctx.session.step = 2;
                await ctx.session.save();
                showMessage(ctx, next);
            },
            2: async () => {
                ctx.session.phone = ctx.message.text;
                ctx.session.step = 0;
                ctx.session.process = 'IDLE';

                await driverModel.create({
                    _telegramId: ctx.session._telegramId,
                    name: ctx.session.name,
                    phone: ctx.session.phone,
                    grade: 'NOT VERIFIED'
                });
                
                ctx.reply('Дякуємо за реестрацію');

                await ctx.session.save();
            }
        },
        "RIDE_REGISTRATION": {
            
        }
    }
    await actionDict[ctx.session.process][ctx.session.step]();
}

function initializeBotServer(token) {
    const bot = new Telegraf(token);
    bot.start(sessionMiddleware('chat'), helpRoute);
    bot.help(sessionMiddleware('chat'), helpRoute)
    bot.command('/new', sessionMiddleware('chat'), newUserRoute);


    bot.action(
        'USE_PROFILE_NAME',
        afterButton,
        sessionMiddleware('action'),
        async (ctx, next) => {
            ctx.session.name = `${ctx.update.callback_query.from.first_name} ${ctx.update.callback_query.from.last_name}`;
            await ctx.session.save();

            return next();
        },
        setProcessAndStepMiddleware("USER_REGISTRATION", 2),
        showMessage
    );
    bot.action(
        'ENTER_NAME',
        afterButton,
        sessionMiddleware('action'),
        setProcessAndStepMiddleware("USER_REGISTRATION", 1),
        showMessage
    );

    bot.command('/profile', sessionMiddleware('chat'), profileRoute);
    bot.command('/clearDev', sessionMiddleware('chat'), clearDev);


    bot.on('text', sessionMiddleware('chat'), processMessage);

    bot.launch();
}

module.exports = { initializeBotServer };
