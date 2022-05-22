const { Scenes, Composer } = require('telegraf');
const { rideModel } = require('../models');
const { broadcastNewRide } = require('../socket');

const saveRide = async(ctx) => {
    const ride = await rideModel.create({
        driver: ctx.state.driver._id,
        from: {
            country: ctx.scene.state.fromCountry,
            city: ctx.scene.state.fromCity
        },
        destination: {
            country: 'Україна',
            city: ctx.scene.state.destinationCity
        },
        departureTime: ctx.scene.state.departureTime,
        vehicle: ctx.scene.state.vehicle,
        status: 'PENDING'
    });
    await ride.populate('driver');
    broadcastNewRide(ride);
};


const fromHandler = new Composer();
fromHandler.action('FROM_ABROAD', async (ctx) => {
    await ctx.deleteMessage();
    ctx.scene.state.enterCountry = true;
    await ctx.reply('Яка країна?');
    
});
fromHandler.action('FROM_UKRAINE', async (ctx) => {
    await ctx.deleteMessage();
    ctx.scene.state.enterCity = true
    await ctx.reply('Місто?');
});
fromHandler.on('text', async (ctx) => {
    if (ctx.scene.state.enterCountry) {
        ctx.scene.state.fromCountry = ctx.message.text;
        ctx.scene.state.fromСity = null;
        return fromHandler.leave(ctx);
    } else if (ctx.scene.state.enterCity) {
        ctx.scene.state.fromCountry = 'Україна';
        ctx.scene.state.fromCity = ctx.message.text;
        return fromHandler.leave(ctx);
    }

});
fromHandler.leave = async (ctx) => {
    await ctx.reply('Введіть кінцевий населенний пункт призначення')
    return ctx.wizard.next();
};

const calendarHandler = new Composer();
calendarHandler.action(/calendar-telegram-date-[\d-]+/g, async (ctx) => {
    await ctx.deleteMessage();
    const date = ctx.match[0].replace("calendar-telegram-date-", "");
    ctx.scene.state.departureTime = date;
    await ctx.reply(`Ви обрали ${date}`);

    await ctx.reply('Ваш тип авто?', {
        reply_markup: {
            inline_keyboard: [
                [ { text: "Легковушка ( < 2т)", callback_data: "SET_CAR" } ],
                [ { text: "Грузова ( < 10т)", callback_data: "SET_VAN" } ],
                [ { text: "Фура ( > 10т)", callback_data: "SET_TRUCK" } ]
            ]
        }
    });
    return ctx.wizard.next();
});

const vehicleHandler = new Composer();
vehicleHandler.setVehicle = (vehicleType) => async (ctx) => {
    await ctx.deleteMessage();
    const vehile = { "CAR": "легковушку", "VAN": "грузову", "TRUCK": "фуру" };
    await ctx.reply(`Ви обрали ${vehile[vehicleType]}`);
    ctx.scene.state.vehicle = vehicleType;
    ctx.reply('Дякуємо! Очікуйте на дзвінок координатора');
    await saveRide(ctx);
    return ctx.scene.leave();
};
vehicleHandler.action('SET_CAR', vehicleHandler.setVehicle('CAR'));
vehicleHandler.action('SET_VAN', vehicleHandler.setVehicle('VAN'));
vehicleHandler.action('SET_TRUCK', vehicleHandler.setVehicle('TRUCK'));

const newRideScene = new Scenes.WizardScene(
    'new-ride-wizard',
    async (ctx) => {
        await ctx.reply('Ви зараз за кордоном?', {
            reply_markup: {
                inline_keyboard: [
                    [ { text: "Так за кордонм", callback_data: "FROM_ABROAD" } ],
                    [ { text: "Ніт, заре в Україні 🇺🇦 ;)", callback_data: "FROM_UKRAINE" } ]
                ]
            }
        });

        return ctx.wizard.next();
    },
    fromHandler,
    async (ctx) => {
        ctx.scene.state.destinationCity = ctx.message.text;
        await ctx.reply('Дата вашої поїздки', ctx.calendar.getCalendar())
        return ctx.wizard.next();
    },
    calendarHandler,
    vehicleHandler
);

module.exports = newRideScene;
