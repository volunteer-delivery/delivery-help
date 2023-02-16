import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { ErrorTrackerModule } from '@app/core/error-tracker';
import { EnvironmentModule } from '@app/core/environment';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { RideModule } from './modules/ride';
import { MicroservicesModule } from './main.mircoservices';

@Module({
    imports: [
        EnvironmentModule,
        PrismaModule,
        AuthModule,
        UserModule,
        RideModule,
        ErrorTrackerModule,
        MicroservicesModule,
    ],
})
export class MainModule {}
