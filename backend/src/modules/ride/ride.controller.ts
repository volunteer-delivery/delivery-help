import {Body, Controller, Get, NotFoundException, Param, Patch} from "@nestjs/common";
import {IRideModel, IUserModel, RideRepository, RideStatus} from "../database";
import {CurrentUser} from "../auth";
import {UpdateStatusRequest} from "./dto";
import {ISuccessResponse} from "../common/types";
import {EventsGateway} from "../events";

@Controller('rides')
export class RideController {
    constructor(
        private readonly rideRepository: RideRepository,
        private readonly eventsGateway: EventsGateway
    ) {}

    @Get()
    async getRides(@CurrentUser() user: IUserModel): Promise<{rides: IRideModel[]}> {
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
        // notifyNewStatus(ride);

        return {success: true};
    }
}
