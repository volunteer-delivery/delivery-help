import {Inject, Injectable} from "@nestjs/common";
import {Context} from "telegraf";
import {IDriverModel, IRideModel, RideRepository} from "../../database";
import {BaseMiddleware, IMiddlewareNext} from "../base";

@Injectable()
export class RidesStateMiddleware extends BaseMiddleware {
    @Inject()
    private readonly rideRepository: RideRepository;

    async handle({state}: Context, next: IMiddlewareNext): Promise<void> {
        state.rides = await this.loadRides(state.driver)
        return next();
    }

    private async loadRides(driver: IDriverModel): Promise<IRideModel[]> {
        return driver ? this.rideRepository.query.find({driver}).exec() : [];
    }
}
