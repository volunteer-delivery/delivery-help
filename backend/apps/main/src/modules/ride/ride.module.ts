import { Module } from '@nestjs/common';
import { RideController } from './ride.controller';
import { RideCommentController } from './ride-comment.controller';

@Module({
    controllers: [
        RideController,
        RideCommentController,
    ],
})
export class RideModule {}
