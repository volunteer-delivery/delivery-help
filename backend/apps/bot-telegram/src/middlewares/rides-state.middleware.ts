import {Inject, Injectable} from "@nestjs/common";
import {Context} from "telegraf";
import {Driver, PrismaService, Ride} from "@app/prisma";
import {BaseMiddleware, IMiddlewareNext} from "../base";

@Injectable()
export class RidesStateMiddleware extends BaseMiddleware {
    @Inject()
    private prisma: PrismaService;

    async handle({state}: Context, next: IMiddlewareNext): Promise<void> {
        state.rides = state.driver ? await this.loadRides(state.driver) : []
        return next();
    }

    private loadRides(driver: Driver): Promise<Ride[]> {
        const query = this.prisma.driver.findUnique({ where: { id: driver.id } });

        return query.rides({
            include: {
                from: true,
                destination: true
            }
        })
    }
}
