import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    NotFoundException,
    Param,
    Patch,
    UseInterceptors,
} from '@nestjs/common';
import { PrismaService, Ride, User } from '@app/prisma';
import { CurrentUser } from '../auth';
import { ISuccessResponse } from '../common/types';
import { RideListResponse,  UpdateStatusRequest } from './dto';
import { UpdateRideStatusService } from './services';

@Controller('rides')
@UseInterceptors(ClassSerializerInterceptor)
export class RideController {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private updateStatusService: UpdateRideStatusService;

    @Get()
    public async getRides(@CurrentUser() user: User): Promise<{ rides: Ride[] }> {
        const rides = await this.prisma.ride.findMany({
            where: {
                OR: [
                    { volunteer: null },
                    { volunteer: { id: user.id } },
                ],
            },
            include: {
                driver: true,
                from: true,
                destination: true,
            },
        });
        return new RideListResponse(rides);
    }

    @Patch(':id/status')
    public async updateStatus(
        @Body() body: UpdateStatusRequest,
        @Param('id') rideId: string,
        @CurrentUser() currentUser: User,
    ): Promise<ISuccessResponse> {
        const ride = await this.prisma.ride.findUnique({
            where: { id: rideId },
            include: { driver: true },
        });

        if (!ride) throw new NotFoundException('Ride not found');

        await this.updateStatusService.update({
            ride,
            status: body.status,
            user: currentUser,
        });

        return { success: true };
    }
}
