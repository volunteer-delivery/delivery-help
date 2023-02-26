import { Inject, Injectable } from '@nestjs/common';
import { BaseComposer, IComposeMiddleware, IInlineMiddleware, ISceneContext } from '../base';
import { BotMenuHandler } from '../bot-menu.handler';
import { BotComposerHelpers } from '../bot-composer.helpers';

@Injectable()
export class WelcomeComposer extends BaseComposer {
    @Inject()
    private menuHanler: BotMenuHandler;

    @Inject()
    private helpers: BotComposerHelpers;

    protected defineMiddlewares(): IComposeMiddleware[] {
        return [
            this.createMenuMiddleware(),
            this.createWelcomeMiddleware(),
        ];
    }

    private createMenuMiddleware(): IInlineMiddleware<ISceneContext> {
        return this.helpers.driverOptional(true, (context) => this.menuHanler.showMenu(context));
    }

    private createWelcomeMiddleware(): IInlineMiddleware<ISceneContext> {
        return this.helpers.driverOptional(false, async (context) => {
            await context.reply('Вітаємо 👋🏻');

            await context.reply(
                'ВолонтерВантаж - це чат-бот для водіїв, які займаються легковими ' +
                'та вантажними перевезеннями, і можуть допомогти волонтерам із ' +
                'транспортуванням різного роду об\'єктів по Україні або з-за кордону.',
            );

            await context.reply(
                '☝🏻 Щоб долучитися, вам необхідно зареєструвати поїздку ' +
                'і прийняти дзвінок від волонтера, який надасть більше деталей.',
            );

            await context.scene.enter('new-driver-wizard');
        });
    }
}
