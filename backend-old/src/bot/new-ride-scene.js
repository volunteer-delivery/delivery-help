const { Scenes, Composer } = require('telegraf');
const { rideModel } = require('../models');
const { showMenu } = require('./menu');
const { broadcastNewRide } = require('../socket');

const daysOfWeek = [
    'Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
];

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
    ctx.state.rides.push(ride);
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
    await ctx.reply('Звідки ви будете їхати?');
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

const dateHandler = new Composer();
dateHandler.showDatePicker = async (ctx) => {
    const keyBoard = [];
    const date = new Date(ctx.scene.state.datePickerFirstDate);

    if (date > ctx.scene.state.datePickerToday) {
        keyBoard.push([ { text: 'Попередні дати', callback_data: 'PREV_DATE_RANGE' } ]);
    }
    for (let i = 0; i < 3; i++) {
        const keyBoardRow = [];
        for (let j = 0; j < 2; j++) {
            const dateStr = date.toISOString().slice(0, 10);
            keyBoardRow.push({
                text: `${dateStr} ${daysOfWeek[date.getDay()]}`,
                callback_data: `PICK_DATE_${dateStr}` 
            });
            date.setDate(date.getDate() + 1);
        }
        keyBoard.push(keyBoardRow);
    }
    keyBoard.push([ { text: 'Наступні дати', callback_data: 'NEXT_DATE_RANGE' } ]);

    await ctx.reply(
        'Оберіть варіант дати, коли ви розпочинаєте поїздку:',
        {
            reply_markup: {
                inline_keyboard: keyBoard
            }
        }
    );
};
dateHandler.action('NEXT_DATE_RANGE', async (ctx) => {
    await ctx.deleteMessage();
    ctx.scene.state.datePickerFirstDate.setDate(
        ctx.scene.state.datePickerFirstDate.getDate() + 6
    );
    await dateHandler.showDatePicker(ctx);
});
dateHandler.action('PREV_DATE_RANGE', async (ctx) => {
    await ctx.deleteMessage();
    ctx.scene.state.datePickerFirstDate.setDate(
        ctx.scene.state.datePickerFirstDate.getDate() - 6
    );
    await dateHandler.showDatePicker(ctx);
});
dateHandler.action(/PICK_DATE_[\d-]+/g, async (ctx) => {
    await ctx.deleteMessage();
    const date = ctx.match[0].replace("PICK_DATE_", "");
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
    const vehile = { 
        'CAR': 'легковий автомобіль',
        'VAN': 'вантажний автомобіль',
        'TRUCK': 'фуру' 
    };
    await ctx.reply(`Ви обрали ${vehile[vehicleType]}`);
    ctx.scene.state.vehicle = vehicleType;
    await saveRide(ctx);
    await ctx.reply('Дякуємо! Ваша заявка прийнята.');
    await ctx.reply('Якщо цей маршрут буде актуальним для волонтерів, вони сконтактують із вами по телефону.');
    await ctx.reply('Зареєструвати наступну поїздку ви зможете після завершення поточної.');
    await ctx.scene.leave();
    await showMenu(ctx);
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
        ctx.scene.state.datePickerToday = new Date();
        ctx.scene.state.datePickerToday.setHours(0, 0, 0, 0);
        ctx.scene.state.datePickerFirstDate = new Date(ctx.scene.state.datePickerToday);
        await dateHandler.showDatePicker(ctx);
        return ctx.wizard.next();
    },
    dateHandler,
    vehicleHandler
);

module.exports = newRideScene;
