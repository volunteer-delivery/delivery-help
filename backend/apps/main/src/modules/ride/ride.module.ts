import { Module } from '@nestjs/common';
import { SchedulerModule } from '@app/core/scheduler';
import { RideController } from './ride.controller';
import { RideCommentController } from './ride-comment.controller';
import { CompleteOutdatedRidesTask } from './tasks';
import { UpdateRideStatusService } from './services';

@Module({
    controllers: [
        RideController,
        RideCommentController,
    ],
    providers: SchedulerModule.withScheduled({
        providers: [UpdateRideStatusService],
        tasks: [CompleteOutdatedRidesTask],
    }),
})
export class RideModule {}
