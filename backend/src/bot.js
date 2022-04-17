const { Telegraf, session } = require('telegraf');
const { driverModel, rideModel, telegramSessionModel } = require('./models');
const { broadcastNewRide } = require('./socket');

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
            0: () => ctx.reply('Ви їдити із за кордону, чи якогось Укранського міста?', {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: "Із України", callback_data: "FROM_UKRAINE" } ],
                        [ { text: "Із за кордону", callback_data: "FROM_ABROAD" } ]
                    ]
                }
            }),
            1: () => ctx.reply('Введіть назву країни:'),
            2: () => ctx.reply('Введіть назву міста:'),
            3: () => ctx.reply('Введіть назву міста куди ви їдите'),
            4: () => ctx.reply('Укажіть дату у форматі YYYY-MM-DD'),
            5: () => ctx.reply('Укажіть до чого з цього більше підходить ваш транспорт?', {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: "Легковушка", callback_data: "SET_CAR" } ],
                        [ { text: "Грузова", callback_data: "SET_VAN" } ],
                        [ { text: "Фура", callback_data: "SET_TRUCK" } ]
                    ]
                }
            }),
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

async function newRideRoute(ctx, next) {
    ctx.session.process = 'RIDE_REGISTRATION';
    ctx.session.step = 0;
    await ctx.session.save();

    if (ctx.driver) {
        showMessage(ctx, next);
    } else {
        ctx.reply('Команда доступна лише для зареєстрованих водіїв');
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
                await ctx.session.save();

                await driverModel.create({
                    _telegramId: ctx.session._telegramId,
                    name: ctx.session.name,
                    phone: ctx.session.phone,
                    grade: 'NOT VERIFIED'
                });
                
                ctx.reply('Дякуємо за реестрацію');
            }
        },
        "RIDE_REGISTRATION": {
            0: async () => { return next(); },
            1: async () => { 
                ctx.session.fromCountry = ctx.message.text;
                ctx.session.step = 3;
                await ctx.session.save();
                showMessage(ctx, next);
            },
            2: async () => { 
                ctx.session.fromCity = ctx.message.text;
                ctx.session.step = 3;
                await ctx.session.save();
                showMessage(ctx, next);
            },
            3: async () => { 
                ctx.session.destinationCity = ctx.message.text;
                ctx.session.step = 4;
                await ctx.session.save();
                showMessage(ctx, next);
            },
            4: async () => { 
                ctx.session.departureTime = ctx.message.text;
                ctx.session.step = 5;
                await ctx.session.save();
                showMessage(ctx, next);
            },
            5: async () => { return next(); },
        }
    }
    await actionDict[ctx.session.process][ctx.session.step]();
}

function setVehicle(vehicleType) {
    return async(ctx, next) => {
        ctx.session.vehicle = vehicleType;
        ctx.session.step = 0;
        ctx.session.process = 'IDLE';
        await ctx.session.save();

        const ride = await rideModel.create({
            driver: ctx.driver._id,
            from: {
                country: ctx.session.fromCountry,
                city: ctx.session.fromCity
            },
            destination: {
                country: 'Україна',
                city: ctx.session.destinationCity
            },
            departureTime: ctx.session.departureTime,
            vehicle: ctx.session.vehicle,
            status: 'PENDING'
        });
        await ride.populate('driver');
        broadcastNewRide(ride);

        ctx.reply('Дякуємо!');
    }
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

    bot.action(
        'FROM_UKRAINE',
        afterButton,
        sessionMiddleware('action'),
        async (ctx, next) => {
            ctx.session.fromCountry = 'Україна';
            await ctx.session.save();

            return next();
        },
        setProcessAndStepMiddleware("RIDE_REGISTRATION", 2),
        showMessage
    );

    bot.action(
        'FROM_ABROAD',
        afterButton,
        sessionMiddleware('action'),
        async (ctx, next) => {
            ctx.session.fromСity = null;
            await ctx.session.save();

            return next();
        },
        setProcessAndStepMiddleware("RIDE_REGISTRATION", 1),
        showMessage
    );

    bot.command('/ride', sessionMiddleware('chat'), newRideRoute);
    bot.command('/profile', sessionMiddleware('chat'), profileRoute);
    bot.command('/clearDev', sessionMiddleware('chat'), clearDev);


    bot.action('SET_CAT', afterButton, sessionMiddleware('action'), setVehicle('CAR'));
    bot.action('SET_VAN', afterButton, sessionMiddleware('action'), setVehicle('VAN'));
    bot.action('SET_TRUCK', afterButton, sessionMiddleware('action'), setVehicle('TRUCK'));


    bot.on('text', sessionMiddleware('chat'), processMessage);

    bot.launch();
}

module.exports = { initializeBotServer };
