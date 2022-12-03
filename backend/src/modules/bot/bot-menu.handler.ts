import {Inject, Injectable} from "@nestjs/common";
import {Context, Markup} from "telegraf";
import {BotComposerHelpers} from "./bot-composer.helpers";
import {IInlineMiddleware, IMiddlewareNext, ISceneContext} from "./base";
import {BotConnection} from "./bot.connection";
import {Ride, Address, RideStatus} from "../prisma";

enum MenuItems {
    PROFILE = 'Мій профіль',
    NEW_RIDE = 'Зареєструвати поїздку',
    RIDE_HISTORY = 'Історія поїздок',
    ACTIVE_RIDE = 'Переглянути поточні поїздки'
}

@Injectable()
export class BotMenuHandler {
    @Inject()
    private connection: BotConnection;

    @Inject()
    private helpers: BotComposerHelpers;

    private defineHandlers(): Record<MenuItems, IInlineMiddleware> {
        return {
            [MenuItems.PROFILE]: this.createProfileHandler(),
            [MenuItems.NEW_RIDE]: this.createNewRideHandler(),
            [MenuItems.RIDE_HISTORY]: this.createRideHistoryHandler(),
            [MenuItems.ACTIVE_RIDE]: this.createActiveRideHandler()
        };
    }

    registerHandlers(): void {
        for (const [event, handler] of Object.entries(this.defineHandlers())) {
            this.connection.hears(event, handler);
        }
    }

    async showMenu(context: Context): Promise<void> {
        await context.reply('Оберіть дію', this.createMenu(context));
    }

    async hideMenu(context: Context, next: IMiddlewareNext): Promise<void> {
        const msg = await context.reply('hide menu', Markup.removeKeyboard());
        await context.deleteMessage(msg.message_id);
        return next();
    }

    private createMenu(context: Context): Markup.Markup<any> {
        const topMenu = this.helpers.isNonFinishedRides(context) ?
            [[MenuItems.ACTIVE_RIDE], [MenuItems.NEW_RIDE]] :
            [[MenuItems.NEW_RIDE]];

        return Markup.keyboard([
            ...topMenu,
            [MenuItems.PROFILE, MenuItems.RIDE_HISTORY]
        ]).resize();
    }

    private createProfileHandler(): IInlineMiddleware {
        return this.helpers.driverOptional(true, async (context) => {
            await context.reply(`Ім'я: ${context.state.driver.name}`);
            await context.reply(`Телефон: ${context.state.driver.phone}`);
        })
    }

    private createNewRideHandler(): IInlineMiddleware {
        const enterWizard = (context: ISceneContext) => context.scene.enter('new-ride-wizard');
        return this.helpers.driverOptional(true, this.hideMenu.bind(this), enterWizard);
    }

    private createRideHistoryHandler(): IInlineMiddleware {
        return async (context: Context) => {
            if (context.state.hasOwnProperty('rides') && context.state.rides.length > 0) {
                for (const ride of context.state.rides) {
                    await context.replyWithHTML(this.formatRideReply(ride));
                }
            } else {
                await context.reply('Наразі у вас ще не було зареєстрованих поїздок');
            }
        }
    }

    private createActiveRideHandler(): IInlineMiddleware {
        return this.helpers.nonFinishedRidesOptional(true, async (context) => {
            for (const ride of context.state.rides) {
                if (ride.status !== RideStatus.FINISHED) {
                    await context.replyWithHTML(this.formatRideReply(ride, false));
                }
            }
        })
    }

    private formatRideReply(ride: Ride & { from: Address, destination: Address }, showStatus = true): string {
        const date = ride.departureTime.toISOString().slice(0, 10);
        const from = ride.from || ride.from.country;

        let status = '';

        if (!showStatus) {
            status = {
                [RideStatus.FINISHED]: '\n<b>Вашу поїздку завершено.</b>',
                [RideStatus.PENDING]: '\n<b>Інформація про вашу поїздку в обробці.</b>',
                [RideStatus.ACTIVE]: '\n<b>Інформація про вашу поточну поїздку.</b>',
            }[ride.status] || '';
        }

        return `Дата: ${date}\nЗвідки: ${from}\nКуди: ${ride.destination.city}` + status;
    };
}
