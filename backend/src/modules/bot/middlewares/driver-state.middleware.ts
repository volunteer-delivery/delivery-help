import {Inject, Injectable} from "@nestjs/common";
import {Context} from "telegraf";
import {BaseMiddleware, IMiddlewareNext} from "../base";
import {Driver, PrismaService} from "../../prisma";

@Injectable()
export class DriverStateMiddleware extends BaseMiddleware {
    @Inject()
    private prisma: PrismaService;

    async handle({state, chat}: Context, next: IMiddlewareNext): Promise<void> {
        state.driver = await this.loadDriver(chat.id)
        return next();
    }

    private loadDriver(telegramId: number): Promise<Driver> {
        return this.prisma.driver.findUnique({
            where: { telegramId: telegramId.toString() }
        });
    }
}
