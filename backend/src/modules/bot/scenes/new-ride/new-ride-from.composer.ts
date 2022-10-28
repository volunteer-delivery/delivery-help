import {BaseComposer, OnAction, OnEvent} from "../../base";
import {Injectable} from "@nestjs/common";
import {INewRideContext} from "./new-ride.context";

export enum FromType {
    UKRAINE = "FROM_UKRAINE",
    ABROAD = "FROM_ABROAD"
}

@Injectable()
export class NewRideFromComposer extends BaseComposer {
    @OnAction(FromType.UKRAINE)
    private async onFromUkraine(context: INewRideContext): Promise<void> {
        await context.deleteMessage();
        context.scene.state.enterCity = true
        await context.reply('Звідки ви будете їхати?');
    }

    @OnAction(FromType.ABROAD)
    private async onFromAbroad(context: INewRideContext): Promise<void> {
        await context.deleteMessage();
        context.scene.state.enterCountry = true;
        await context.reply('Напишіть країну та місто, в якому ви зараз перебуваєте:');
        await context.reply('(Наприклад: Польща, Вроцлав)');
    }

    @OnEvent('text')
    private async onText(context: INewRideContext): Promise<void> {
        if (context.scene.state.enterCountry) {
            context.scene.state.fromCountry = context.message.text;
            context.scene.state.fromCity = null;
            await this.leave(context);
            return;
        }

        if (context.scene.state.enterCity) {
            context.scene.state.fromCountry = 'Україна';
            context.scene.state.fromCity = context.message.text;
            await this.leave(context);
        }
    }

    private async leave(context: INewRideContext): Promise<void> {
        await context.reply('Зазначте кінцевий населений пункт:');
        await context.reply('(Наприклад: Україна, Черкаси)')
        await context.wizard.next();
    }
}
