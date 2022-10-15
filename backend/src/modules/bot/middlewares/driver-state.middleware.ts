import {Inject, Injectable} from "@nestjs/common";
import {Context} from "telegraf";
import {DriverRepository, IDriverModel} from "../../database";
import {BaseMiddleware, IMiddlewareNext} from "../base";

@Injectable()
export class DriverStateMiddleware extends BaseMiddleware {
    @Inject()
    private readonly driverRepository: DriverRepository;

    async handle({state, chat}: Context, next: IMiddlewareNext): Promise<void> {
        state.driver = await this.loadDriver(chat.id)
        return next();
    }

    private loadDriver(telegramId: number): Promise<IDriverModel> {
        return this.driverRepository.query.findOne({_telegramId: telegramId}).exec();
    }
}
