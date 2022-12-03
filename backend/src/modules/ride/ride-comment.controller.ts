import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import {ISuccessResponse} from "../common/types";
import {AddCommentRequest} from "./dto";
import {CurrentUser} from "../auth";
import {EventsGateway} from "../events";
import {PrismaService, User, RideComment} from "../prisma";

@Controller('/rides/:id/comments')
export class RideCommentController {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private eventsGateway: EventsGateway;

    @Get()
    async getComments(@Param('id') rideId: string): Promise<RideComment[]> {
        return this.prisma.rideComment.findMany({
            where: { rideId },
            include: { author: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    @Post()
    async addComment(
        @Param('id') rideId: string,
        @Body() body: AddCommentRequest,
        @CurrentUser() currentUser: User
    ): Promise<ISuccessResponse> {
        const comment = await this.prisma.rideComment.create({
            data: {
                text: body.text,
                author: {
                    connect: { id: currentUser.id }
                },
                ride: {
                    connect: { id: rideId }
                }
            },
            include: { author: true }
        });

        this.eventsGateway.broadcastNewRideComment(rideId, comment);

        return {success: true};
    }
}
