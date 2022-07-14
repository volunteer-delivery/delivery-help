const { Scenes, Composer, Markup } = require('telegraf');
const { driverModel } = require('../models')

const saveDriver = async (ctx) => {
    await driverModel.create({
        _telegramId: ctx.chat.id,
        name: ctx.scene.state.name,
        phone: ctx.scene.state.phone,
        grade: 'NOT VERIFIED'
    });
};

const contactHandler = new Composer();
contactHandler.on('text', async (ctx) => {
    await ctx.reply(
        'Натисніть кнопку "Відправити свої контактні дані"',
        {
            reply_markup: {
                one_time_keyboard: true,
                keyboard: [
                    [ { text: 'Відправити свої контактні дані', request_contact: true } ]
                ]
            }
        }
    );
});
contactHandler.on('contact', async (ctx) => {
    const phone = ctx.message.contact.phone_number;
    const name = `${ctx.message.contact.first_name} ${ctx.message.contact.last_name}`;
    ctx.scene.state.phone = phone;
    ctx.scene.state.name = name;
    return contactHandler.leave(ctx);
});
contactHandler.leave = async (ctx) => {
    await ctx.reply(
        'Ваш контакт успішно збережено. Якщо ви вже знаєте деталі своєї ' +
        'найближчої поїздки і хочете допомогти волонтерам, натисніть ' +
        'кнопку "Зареєструвати поїздку".',
        {
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
        await ctx.reply(
            'Натисніть кнопку "Відправити свої контактні дані", ' +
            'щоби поділитися ними із волонтерами, яким потрібна ' +
            'допомога. Надана інформація безпечно зберігається у волонтерській базі.',
            {
                reply_markup: {
                    one_time_keyboard: true,
                    keyboard: [
                        [ { text: 'Відправити свої контактні дані', request_contact: true } ]
                    ]
                }
            }
        );

        return ctx.wizard.next();
    },
    contactHandler
);

module.exports = newDriverScene;
