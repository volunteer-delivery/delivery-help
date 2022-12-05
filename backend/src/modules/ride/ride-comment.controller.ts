import {Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, UseInterceptors} from "@nestjs/common";
import {ISuccessResponse} from "../common/types";
import {CurrentUser} from "../auth";
import {EventsGateway} from "../events";
import {PrismaService, RideComment, User} from "../prisma";
import {AddCommentRequest, RideCommentListResponse, RideCommentResponse} from "./dto";
import {instanceToPlain, plainToInstance} from "class-transformer";

@Controller('/rides/:id/comments')
@UseInterceptors(ClassSerializerInterceptor)
export class RideCommentController {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private eventsGateway: EventsGateway;

    @Get()
    async getComments(@Param('id') rideId: string): Promise<RideCommentListResponse> {
        const comments = await this.prisma.rideComment.findMany({
            where: { rideId },
            include: { author: true },
            orderBy: { createdAt: 'desc' }
        });
        return new RideCommentListResponse(comments);
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

        this.broadcastNewRideComment(comment);

        return {success: true};
    }

    private broadcastNewRideComment(comment: RideComment & { author: User }): void {
        this.eventsGateway.send(`rides/${comment.rideId}/comments/new`, new RideCommentResponse(comment));
    }
}
