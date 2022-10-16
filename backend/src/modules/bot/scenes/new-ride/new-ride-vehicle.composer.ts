import {Inject, Injectable} from "@nestjs/common";
import {RideRepository, RideStatus, Vehicle} from "../../../database";
import {BaseComposer, IComposeHandler} from "../../base";
import {INewRideContext} from "./new-ride.context";
import {EventsGateway} from "../../../events";
import {BotMenuHandler} from "../../bot-menu.handler";

const CHOOSED_VEHICLE: Record<Vehicle, string> = {
    [Vehicle.CAR]: 'легковий автомобіль',
    [Vehicle.VAN]: 'вантажний автомобіль',
    [Vehicle.TRUCK]: 'фуру'
};

type IActions = `SET_${Vehicle}`;

@Injectable()
export class NewRideVehicleComposer extends BaseComposer {
    @Inject()
    private rideRepository: RideRepository;

    @Inject()
    private eventsGateway: EventsGateway;

    @Inject()
    private menuHandler: BotMenuHandler;

    protected defineActions(): Partial<Record<IActions, IComposeHandler>> {
        return {
            SET_CAR: this.setVehicle(Vehicle.CAR),
            SET_VAN: this.setVehicle(Vehicle.VAN),
            SET_TRUCK: this.setVehicle(Vehicle.TRUCK)
        };
    }

    private setVehicle(vehicleType: Vehicle): IComposeHandler {
        return async (context: INewRideContext) => {
            await context.deleteMessage();

            await context.reply(`Ви обрали ${CHOOSED_VEHICLE[vehicleType]}`);
            context.scene.state.vehicle = vehicleType;

            await this.saveRide(context);

            await context.reply('Дякуємо! Ваша заявка прийнята.');
            await context.reply('Якщо цей маршрут буде актуальним для волонтерів, вони сконтактують із вами по телефону.');
            await context.reply('Зареєструвати наступну поїздку ви зможете після завершення поточної.');
            await context.scene.leave();

            await this.menuHandler.showMenu(context);
        };
    }

    private async saveRide(context: INewRideContext): Promise<void> {
        const ride = await this.rideRepository.query.create({
            driver: context.state.driver.id,
            from: {
                country: context.scene.state.fromCountry,
                city: context.scene.state.fromCity
            },
            destination: {
                country: 'Україна',
                city: context.scene.state.destinationCity
            },
            departureTime: context.scene.state.departureTime,
            vehicle: context.scene.state.vehicle,
            status: RideStatus.PENDING
        });

        await ride.populate('driver');
        context.state.rides.push(ride);

        this.eventsGateway.broadcastNewRide(ride);
    }
}