import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    NotFoundException,
    Param,
    Patch,
    UseInterceptors
} from "@nestjs/common";
import {CurrentUser} from "../auth";
import {ISuccessResponse} from "../common/types";
import {EventsGateway} from "../events";
import {BotConnection} from "../bot";
import {RideListResponse, RideResponse, UpdateStatusRequest} from "./dto";
import {Address, Driver, PrismaService, Ride, RideStatus, User} from "../prisma";

const CHANGE_STATUS: Record<RideStatus, string> = {
    [RideStatus.PENDING]: '',
    [RideStatus.ACTIVE]: 'Інформацію про вашу поїздку оброблено і тепер вона активна. Бажаємо гарної дороги 🙌🏻',
    [RideStatus.FINISHED]: 'Ваша поїздка завершилася. Дякуємо за допомогу! Слава Україні 💙💛'
};

@Controller('rides')
@UseInterceptors(ClassSerializerInterceptor)
export class RideController {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private eventsGateway: EventsGateway;

    @Inject()
    private bot: BotConnection;

    @Get()
    async getRides(@CurrentUser() user: User): Promise<{ rides: Ride[] }> {
        const rides = await this.prisma.ride.findMany({
            where: {
                OR: [
                    { volunteer: null },
                    { volunteer: { id: user.id } }
                ]
            },
            include: {
                driver: true,
                from: true,
                destination: true
            }
        });
        return new RideListResponse(rides);
    }

    @Patch(':id/status')
    async updateStatus(
        @Body() body: UpdateStatusRequest,
        @Param('id') rideId: string,
        @CurrentUser() currentUser: User
    ): Promise<ISuccessResponse> {
        const ride = await this.prisma.ride.findUnique({
            where: { id: rideId },
            include: { driver: true }
        });

        if (!ride) throw new NotFoundException('Ride not found');

        const updated = await this.prisma.ride.update({
            where: { id: rideId },
            data: {
                status: body.status,
                volunteer: {
                    connect: { id: currentUser.id }
                }
            },
            include: {
                driver: true,
                from: true,
                destination: true
            }
        });

        const socketUpdateUserId = ride.status === RideStatus.PENDING ? null : currentUser.id;
        this.broadcastUpdateRide(socketUpdateUserId, updated);
        await this.notifyNewStatus(updated);

        return {success: true};
    }

    broadcastUpdateRide(userId: string | null, ride: Ride & { driver: Driver, from: Address, destination: Address }): void {
        const namespace = userId ? `users/${userId}/rides` : 'rides';
        this.eventsGateway.send(`${namespace}/update`, new RideResponse(ride));
    }

    private async notifyNewStatus(ride: Ride & { driver: Driver }): Promise<void> {
        const telegramId = ride.driver?.telegramId;
        const message = CHANGE_STATUS[ride.status];

        if (telegramId && message) {
            await this.bot.sendMessage(ride.driver.telegramId, message);
        }
    }
}
