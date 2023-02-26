import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, UseInterceptors } from '@nestjs/common';
import { PrismaService, User } from '@app/prisma';
import { WebsocketMicroserviceApi } from '@app/websocket/websocket.microservice-api';
import { ISuccessResponse } from '../common/types';
import { CurrentUser } from '../auth';
import { AddCommentRequest, RideCommentListResponse, RideCommentResponse, RideCommentResponseAttrs } from './dto';

@Controller('/rides/:id/comments')
@UseInterceptors(ClassSerializerInterceptor)
export class RideCommentController {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private websocketMicroservice: WebsocketMicroserviceApi;

    @Get()
    public async getComments(@Param('id') rideId: string): Promise<RideCommentListResponse> {
        const comments = await this.prisma.rideComment.findMany({
            where: { rideId },
            include: { author: true },
            orderBy: { createdAt: 'desc' },
        });
        return new RideCommentListResponse(comments);
    }

    @Post()
    public async addComment(
        @Param('id') rideId: string,
        @Body() body: AddCommentRequest,
        @CurrentUser() currentUser: User,
    ): Promise<ISuccessResponse> {
        const comment = await this.prisma.rideComment.create({
            data: {
                text: body.text,
                author: {
                    connect: { id: currentUser.id },
                },
                ride: {
                    connect: { id: rideId },
                },
            },
            include: { author: true },
        });

        await this.broadcastNewRideComment(comment);

        return { success: true };
    }

    private async broadcastNewRideComment(comment: RideCommentResponseAttrs): Promise<void> {
        await this.websocketMicroservice.broadcast(`rides/${comment.rideId}/comments/new`, new RideCommentResponse(comment));
    }
}
