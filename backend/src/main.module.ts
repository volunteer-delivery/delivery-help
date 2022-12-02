import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./modules/auth";
import {DatabaseModule} from "./modules/database";
import {PrismaModule} from './modules/prisma';
import {UserModule} from "./modules/user";
import {RideModule} from "./modules/ride";
import {EventsModule} from "./modules/events";
import {DriverModule} from "./modules/driver";
import {BotModule} from "./modules/bot";
import {ErrorTrackerModule} from "./modules/error-tracker";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true
        }),
        DatabaseModule,
        PrismaModule,
        EventsModule,
        AuthModule,
        UserModule,
        RideModule,
        DriverModule,
        BotModule,
        ErrorTrackerModule
    ]
})
export class MainModule {}
