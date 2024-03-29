import { Markup } from 'telegraf';
import type { Message } from 'typegram';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { BaseComposer, ISceneContext, OnEvent } from '../../base';
import { BotMenuHandler } from '../../bot-menu.handler';

type IContext = ISceneContext & {
    message: Message.ContactMessage;

    scene: {
        state: {
            phone: string;
            name: string;
        };
    };
};

@Injectable()
export class NewDriverContactComposer extends BaseComposer {
    @Inject()
    private menuHandler: BotMenuHandler;

    @Inject()
    private prisma: PrismaService;

    @OnEvent('text')
    private async onText(context: IContext): Promise<void> {
        await context.reply(
            'Натисніть кнопку "Відправити свої контактні дані"',
            Markup.keyboard([
                [Markup.button.contactRequest('Відправити свої контактні дані')],
            ]).oneTime(),
        );
    }

    @OnEvent('contact')
    private async onContact(context: IContext): Promise<void> {
        const { phone_number, first_name, last_name } = context.message.contact;
        context.scene.state.phone = phone_number;
        context.scene.state.name = `${first_name} ${last_name}`;
        await this.leave(context);
    }

    private async leave(context: IContext): Promise<void> {
        await context.reply(
            '📥 Ваш контакт успішно збережено. Якщо ви вже знаєте деталі своєї ' +
            'найближчої поїздки і хочете допомогти волонтерам, натисніть кнопку "Зареєструвати поїздку".',
            Markup.removeKeyboard(),
        );
        await this.saveDriver(context);
        await context.scene.leave();
        await this.menuHandler.showMenu(context);
    }

    private async saveDriver(context: IContext): Promise<void> {
        await this.prisma.driver.create({
            data: {
                telegramId: context.chat.id.toString(),
                name: context.scene.state.name,
                phone: context.scene.state.phone,
            },
        });
    }
}
