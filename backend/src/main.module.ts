import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./modules/auth";
import {DatabaseModule} from "./modules/database";
import {UserModule} from "./modules/user";
import {RideModule} from "./modules/ride";
import {EventsModule} from "./modules/events";
import {DriverModule} from "./modules/driver";
import {BotModule} from "./modules/bot";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true
        }),
        DatabaseModule,
        EventsModule,
        AuthModule,
        UserModule,
        RideModule,
        DriverModule,
        BotModule
    ]
})
export class MainModule {}
