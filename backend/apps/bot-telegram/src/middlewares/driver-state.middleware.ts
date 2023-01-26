import {Inject, Injectable} from "@nestjs/common";
import {Context} from "telegraf";
import {Driver, PrismaService} from "@app/prisma";
import {BaseMiddleware, IMiddlewareNext} from "../base";

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
