const { Scenes, Composer } = require('telegraf');
const { driverModel } = require('../models')

const saveDriver = async (ctx) => {
    await driverModel.create({
        _telegramId: ctx.chat.id,
        name: ctx.scene.state.name,
        phone: ctx.scene.state.phone,
        grade: 'NOT VERIFIED'
    });
};

const nameHandler = new Composer();
nameHandler.action('USE_PROFILE_NAME', async (ctx) => {
    await ctx.deleteMessage();
    const name = `${ctx.update.callback_query.from.first_name} ${ctx.update.callback_query.from.last_name}`;
    ctx.scene.state.name = name;

    await ctx.reply(`Беремо ${name}`);
    return nameHandler.leave(ctx);
});
nameHandler.action('ENTER_NAME', async (ctx) => {
    await ctx.deleteMessage();
    ctx.scene.state.enterNameFlag = true;
    await ctx.reply('Введіть ваше ім\'я');
});
nameHandler.on('text', async (ctx) => {
    if (ctx.scene.state.enterNameFlag) {
        ctx.scene.state.name = ctx.message.text;
        return nameHandler.leave(ctx);
    }
});
nameHandler.leave = async (ctx) => {
    await ctx.reply('Введіть ваш номер:', {
        reply_markup: {
            one_time_keyboard: true,
            keyboard: [
                [ { text: 'Відправити мій телеграм контакт 📲', request_contact: true } ]
            ]
        }
    });
    return ctx.wizard.next();
};

const phoneHandler = new Composer();
phoneHandler.on('text', async (ctx) => {
    ctx.scene.state.phone = ctx.message.text;
    return phoneHandler.leave(ctx);
});
phoneHandler.on('contact', async (ctx) => {
    const phone = ctx.message.contact.phone_number;
    ctx.scene.state.phone = phone;
    return phoneHandler.leave(ctx);
});
phoneHandler.leave = async (ctx) => {
    await ctx.reply('Дякуємо за реестрацію', {
        reply_markup: {
            remove_keyboard: true
        }
    });
    await saveDriver(ctx);
    return ctx.scene.leave();
};

const newDriverScene = new Scenes.WizardScene(
    'new-driver-wizard',
    async (ctx) => {
        await ctx.reply('Як вас звати?', {
            reply_markup: {
                inline_keyboard: [
                    [ { text: `Це моє ім\'я ${ctx.message.chat.first_name} ${ctx.message.chat.last_name}`, callback_data: "USE_PROFILE_NAME" } ],
                    [ { text: "Ні, я введу його самостійно", callback_data: "ENTER_NAME" } ]
                ]
            }
        });

        return ctx.wizard.next();
    },
    nameHandler,
    phoneHandler
);

module.exports = newDriverScene;
