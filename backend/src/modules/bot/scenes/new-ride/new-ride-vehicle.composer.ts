import {Inject, Injectable} from "@nestjs/common";
import {BaseComposer, OnAction} from "../../base";
import {INewRideContext} from "./new-ride.context";
import {EventsGateway} from "../../../events";
import {BotMenuHandler} from "../../bot-menu.handler";
import {PrismaService, RideStatus, Vehicle} from "../../../prisma";

const CHOOSED_VEHICLE: Record<Vehicle, string> = {
    [Vehicle.CAR]: 'легковий автомобіль',
    [Vehicle.VAN]: 'вантажний автомобіль',
    [Vehicle.TRUCK]: 'фуру'
};

type IActions = `SET_${Vehicle}`;

@Injectable()
export class NewRideVehicleComposer extends BaseComposer {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private eventsGateway: EventsGateway;

    @Inject()
    private menuHandler: BotMenuHandler;

    @OnAction('SET_CAR')
    private async setCar(context: INewRideContext): Promise<void> {
        await this.setVehicle(Vehicle.CAR, context);
    }

    @OnAction('SET_VAN')
    private async setVan(context: INewRideContext): Promise<void> {
        await this.setVehicle(Vehicle.VAN, context);
    }

    @OnAction('SET_TRUCK')
    private async setTruck(context: INewRideContext): Promise<void> {
        await this.setVehicle(Vehicle.TRUCK, context);
    }

    private async setVehicle(vehicleType: Vehicle, context: INewRideContext): Promise<void> {
        await context.deleteMessage();

        await context.reply(`Ви обрали ${CHOOSED_VEHICLE[vehicleType]}`);
        context.scene.state.vehicle = vehicleType;

        await this.saveRide(context);

        await context.reply('Дякуємо! Ваша заявка прийнята.');
        await context.reply('Якщо цей маршрут буде актуальним для волонтерів, вони сконтактують із вами по телефону.');
        await context.reply('Якщо ви плануєте ще поїздку, розпочніть її реєстрацію вже зараз.');
        await context.scene.leave();

        await this.menuHandler.showMenu(context);
    }

    private async saveRide(context: INewRideContext): Promise<void> {
        const ride = await this.prisma.ride.create({
            data: {
                departureTime: context.scene.state.departureTime,
                vehicle: context.scene.state.vehicle,
                status: RideStatus.PENDING,
                driver: {
                    connect: { id: context.state.driver.id }
                },
                from: {
                    create: {
                        country: context.scene.state.fromCountry,
                        city: context.scene.state.fromCity
                    }
                },
                destination: {
                    create: {
                        country: 'Україна',
                        city: context.scene.state.destinationCity
                    }
                }
            },
            include: { driver: true }
        });

        context.state.rides.push(ride);

        this.eventsGateway.broadcastNewRide(ride);
    }
}
