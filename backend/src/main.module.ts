import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./modules/auth";
import {PrismaModule} from './modules/prisma';
import {UserModule} from "./modules/user";
import {RideModule} from "./modules/ride";
import {EventsModule} from "./modules/events";
import {BotModule} from "./modules/bot";
import {ErrorTrackerModule} from "./modules/error-tracker";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true
        }),
        PrismaModule,
        EventsModule,
        AuthModule,
        UserModule,
        RideModule,
        BotModule,
        ErrorTrackerModule
    ]
})
export class MainModule {}
