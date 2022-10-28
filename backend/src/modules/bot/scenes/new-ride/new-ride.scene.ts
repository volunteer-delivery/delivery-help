import {Markup} from "telegraf";
import {Injectable} from "@nestjs/common";
import {BaseWizardScene, ISceneDefinition} from "../../base";
import {FromType, NewRideFromComposer} from "./new-ride-from.composer";
import {NewRideDateComposer} from "./new-ride-date.composer";
import {INewRideContext} from "./new-ride.context";
import {NewRideVehicleComposer} from "./new-ride-vehicle.composer";

@Injectable()
export class NewRideScene extends BaseWizardScene<INewRideContext> {
    id = 'new-ride-wizard';

    defineSteps(): ISceneDefinition<INewRideContext>[] {
        return [
            this.startFromTypeStep,
            NewRideFromComposer,
            this.startDateStep,
            NewRideDateComposer,
            NewRideVehicleComposer
        ];
    }

    private async startFromTypeStep(context: INewRideContext): Promise<void> {
        await context.reply(
            'Оберіть варіант локації, з якої ви розпочинаєте поїздку:',
            Markup.inlineKeyboard([
                [Markup.button.callback("Я в Україні", FromType.UKRAINE)],
                [Markup.button.callback("Я за кордоном", FromType.ABROAD)]
            ])
        );

        await context.wizard.next();
    }

    private async startDateStep(context: INewRideContext): Promise<void> {
        context.scene.state.destinationCity = context.message.text;
        context.scene.state.datePickerToday = new Date();
        context.scene.state.datePickerToday.setHours(0, 0, 0, 0);
        context.scene.state.datePickerFirstDate = new Date(context.scene.state.datePickerToday);
        await this.getStep(NewRideDateComposer).showDatePicker(context);
        await context.wizard.next();
    }
}
