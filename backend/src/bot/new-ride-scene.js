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
    await ctx.reply('Напишіть країну та місто, в якому ви зараз перебуваєте:');
    await ctx.reply('(Наприклад: Польща, Вроцлав)');
    
});
fromHandler.action('FROM_UKRAINE', async (ctx) => {
    await ctx.deleteMessage();
    ctx.scene.state.enterCity = true
    await ctx.reply('Вкажіть місто:');
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
    await ctx.reply('Зазначте кінцевий населений пункт:');
    await ctx.reply('(Наприклад: Україна, Черкаси)')
    return ctx.wizard.next();
};

const calendarHandler = new Composer();
calendarHandler.action(/calendar-telegram-date-[\d-]+/g, async (ctx) => {
    await ctx.deleteMessage();
    const date = ctx.match[0].replace("calendar-telegram-date-", "");
    ctx.scene.state.departureTime = date;
    await ctx.reply(`Ви вказали, що ваша поїздка розпочнеться ${date}`);

    await ctx.reply('Оберіть габарити вашого транспортного засобу:', {
        reply_markup: {
            inline_keyboard: [
                [ { text: "Легковий автомобіль ( < 2т)", callback_data: "SET_CAR" } ],
                [ { text: "Вантажний автомобіль ( < 10т)", callback_data: "SET_VAN" } ],
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
    ctx.reply('Дякуємо! Ваша заявка прийнята.');
    ctx.reply('Якщо цей маршрут буде актуальним для волонтерів, вони сконтактують із вами по телефону.');
    ctx.reply(
        'Ваша допомога є неоціненною, тож якщо ви маєте бажання продовжити волонтерити,' +
        ' натисніть на кнопку "Зареєструвати поїздку".'
    );
    ctx.reply('Разом - ми сила!');
    await saveRide(ctx);
    return ctx.scene.leave();
};
vehicleHandler.action('SET_CAR', vehicleHandler.setVehicle('CAR'));
vehicleHandler.action('SET_VAN', vehicleHandler.setVehicle('VAN'));
vehicleHandler.action('SET_TRUCK', vehicleHandler.setVehicle('TRUCK'));

const newRideScene = new Scenes.WizardScene(
    'new-ride-wizard',
    async (ctx) => {
        await ctx.reply('Оберіть варіант локації, з якої ви розпочинаєте поїздку:', {
            reply_markup: {
                inline_keyboard: [
                    [ { text: "Я в Україні", callback_data: "FROM_UKRAINE" } ],
                    [ { text: "Я за кордоном", callback_data: "FROM_ABROAD" } ]
                ]
            }
        });

        return ctx.wizard.next();
    },
    fromHandler,
    async (ctx) => {
        ctx.scene.state.destinationCity = ctx.message.text;
        await ctx.reply('Вкажіть дату початку запланованої поїздки: ', ctx.calendar.getCalendar())
        return ctx.wizard.next();
    },
    calendarHandler,
    vehicleHandler
);

module.exports = newRideScene;
