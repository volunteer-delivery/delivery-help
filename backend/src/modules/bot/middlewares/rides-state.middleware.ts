import {Inject, Injectable} from "@nestjs/common";
import {Context} from "telegraf";
import {BaseMiddleware, IMiddlewareNext} from "../base";
import {Driver, PrismaService, Ride} from "../../prisma";

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
