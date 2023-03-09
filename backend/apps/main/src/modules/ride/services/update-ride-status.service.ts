import { Driver, PrismaService, Ride, RideStatus, User } from '@app/prisma';
import { Inject } from '@nestjs/common';
import { WebsocketMicroserviceApi } from '@app/websocket/websocket.microservice-api';
import { BotMicroserviceApi } from '@app/bot-telegram/bot.microservice-api';
import { RideResponse, RideResponseAttrs } from '../dto';

const CHANGE_STATUS: Record<RideStatus, string> = {
    [RideStatus.PENDING]: '',
    [RideStatus.ACTIVE]: 'Інформацію про вашу поїздку оброблено і тепер вона активна. Бажаємо гарної дороги 🙌🏻',
    [RideStatus.FINISHED]: 'Ваша поїздка завершилася. Дякуємо за допомогу! Слава Україні 💙💛',
};

export interface IUpdateRideStatusOptions {
    ride: Ride;
    status: RideStatus;
    user?: User;
}

export class UpdateRideStatusService {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private websocketMicroservice: WebsocketMicroserviceApi;

    @Inject()
    private botMicroservice: BotMicroserviceApi;

    public async update({ ride, status, user }: IUpdateRideStatusOptions): Promise<void> {
        const updated = await this.prisma.ride.update({
            where: { id: ride.id },
            data: {
                status,
                volunteer: !user ? undefined : {
                    connect: { id: user.id },
                },
            },
            include: {
                driver: true,
                from: true,
                destination: true,
            },
        });

        await this.updateAdminApp(user, ride.status, updated);
        await this.updateBotApp(updated);
    }

    private async updateAdminApp(user: User | null, oldStatus: RideStatus,  updated: RideResponseAttrs): Promise<void> {
        const userId = !user || oldStatus === RideStatus.PENDING ? null : user.id;
        const namespace = userId ? `users/${userId}/rides` : 'rides';
        await this.websocketMicroservice.broadcast(`${namespace}/update`, new RideResponse(updated));
    }

    private async updateBotApp(ride: Ride & { driver: Driver }): Promise<void> {
        const telegramId = ride.driver?.telegramId;
        const message = CHANGE_STATUS[ride.status];

        if (telegramId && message) {
            await this.botMicroservice.sendMessage(telegramId, message);
        }
    }
}
