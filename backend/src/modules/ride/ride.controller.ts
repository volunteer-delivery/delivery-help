import {Body, Controller, Get, Inject, NotFoundException, Param, Patch} from "@nestjs/common";
import {IRideModel, IUserModel, RideRepository, RideStatus} from "../database";
import {CurrentUser} from "../auth";
import {ISuccessResponse} from "../common/types";
import {EventsGateway} from "../events";
import {BotConnection} from "../bot";
import {UpdateStatusRequest} from "./dto";

const CHANGE_STATUS: Record<RideStatus, string> = {
    [RideStatus.PENDING]: '',
    [RideStatus.ACTIVE]: 'Інформацію про вашу поїздку оброблено і тепер вона активна. Бажаємо гарної дороги 🙌🏻',
    [RideStatus.FINISHED]: 'Ваша поїздка завершилася. Дякуємо за допомогу! Слава Україні 💙💛'
};

@Controller('rides')
export class RideController {
    @Inject()
    private rideRepository: RideRepository;

    @Inject()
    private eventsGateway: EventsGateway;

    @Inject()
    private bot: BotConnection;

    @Get()
    async getRides(@CurrentUser() user: IUserModel): Promise<{ rides: IRideModel[] }> {
        const rides = await this.rideRepository.query.find({volunteer: [null, user.id]}).populate('driver').exec();
        return {rides};
    }

    @Patch(':id/status')
    async updateStatus(
        @Body() body: UpdateStatusRequest,
        @Param('id') rideId: string,
        @CurrentUser() currentUser: IUserModel
    ): Promise<ISuccessResponse> {
        const ride = await this.rideRepository.query.findById(rideId).exec();

        if (!ride) throw new NotFoundException('Ride not found');

        const oldStatus = ride.status;
        ride.status = body.status;

        if (body.status === RideStatus.ACTIVE) {
            ride.volunteer = currentUser;
        }

        await ride.save();
        await ride.populate(['driver', 'volunteer'])

        const socketUpdateUserId = oldStatus === RideStatus.PENDING ? null : currentUser.id;
        this.eventsGateway.broadcastUpdateRide(socketUpdateUserId, ride);
        await this.notifyNewStatus(ride);

        return {success: true};
    }

    private async notifyNewStatus(ride: IRideModel): Promise<void> {
        const telegramId = ride.driver?._telegramId;
        const message = CHANGE_STATUS[ride.status];

        if (telegramId && message) {
            await this.bot.sendMessage(ride.driver._telegramId, message);
        }
    }
}
