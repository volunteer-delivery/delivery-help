import {Body, Controller, Get, Inject, NotFoundException, Param, Post} from "@nestjs/common";
import {IRideCommentModel, IUserModel, RideCommentRepository, RideRepository} from "../database";
import {ISuccessResponse} from "../common/types";
import {AddCommentRequest} from "./dto";
import {CurrentUser} from "../auth";
import {EventsGateway} from "../events";

@Controller('/rides/:id/comments')
export class RideCommentController {
    @Inject()
    private rideRepository: RideRepository;

    @Inject()
    private rideCommentRepository: RideCommentRepository;

    @Inject()
    private eventsGateway: EventsGateway;

    @Get()
    async getComments(@Param('id') rideId: string): Promise<IRideCommentModel[]> {
        const ride = await this.fetchRide(rideId);
        return ride.comments;
    }

    @Post()
    async addComment(
        @Param('id') rideId: string,
        @Body() body: AddCommentRequest,
        @CurrentUser() currentUser: IUserModel
    ): Promise<ISuccessResponse> {
        const ride = await this.fetchRide(rideId);

        const comment = await this.rideCommentRepository.query.create({
            createdAt: new Date(),
            author: currentUser.id,
            text: body.text
        });

        await this.rideRepository.query.updateOne({ _id: ride.id }, {
            $push: { comments: comment.id }
        })

        this.eventsGateway.broadcastNewRideComment(ride.id, await comment.populate('author'));

        return {success: true};
    }

    private async  fetchRide(rideId: string) {
        const ride = await this.rideRepository.query.findById(rideId).populate({
            path: 'comments',
            options: {sort: { createdAt: -1 }},
            populate: 'author'
        });

        if (!ride) throw new NotFoundException('Ride not found');

        return ride;
    }
}
