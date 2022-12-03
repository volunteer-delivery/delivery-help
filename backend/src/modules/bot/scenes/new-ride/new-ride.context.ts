import {IWizardSceneContext, Message } from "../../base";
import {Vehicle} from "../../../prisma";

export type INewRideContext = IWizardSceneContext & {
    message: Message.TextMessage;

    scene: {
        state: {
            enterCountry: boolean;
            enterCity: boolean;
            fromCountry: string;
            fromCity: string | null;
            destinationCity: string;
            datePickerFirstDate: Date;
            datePickerToday: Date;
            departureTime: string;
            vehicle: Vehicle;
        }
    }
};
