import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService, Ride, RideStatus } from '@app/prisma';
import { ISchedulerTask } from '@app/core/scheduler';
import { UpdateRideStatusService } from '../services';

@Injectable()
export class CompleteOutdatedRidesTask implements ISchedulerTask {
    private logger = new Logger(this.constructor.name);
    public name = this.constructor.name;
    public cron = '0 10 * * *';

    @Inject()
    private prisma: PrismaService;

    @Inject()
    private updateStatusService: UpdateRideStatusService;

    public async perform(): Promise<void> {
        const rides = await this.findOutdatedRides();

        if (!rides.length) {
            this.logger.log('No outdated rides');
            return;
        }

        await Promise.all(rides.map((ride) => {
            return this.updateStatusService.update({
                ride,
                status: RideStatus.FINISHED,
            });
        }));

        this.logger.log(`Canceled ${rides.length} rides`);
    }

    private findOutdatedRides(): Promise<Ride[]> {
        return this.prisma.ride.findMany({
            where: {
                departureTime: {
                    lt: this.outdatedTime,
                },
                status: RideStatus.PENDING,
            },
        });
    }

    private get outdatedTime(): Date {
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }
}
