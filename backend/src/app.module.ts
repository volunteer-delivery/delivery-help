import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./modules/auth";
import {DatabaseModule} from "./modules/database";
import {UserModule} from "./modules/user";
import {RideModule} from "./modules/ride";
import {EventsModule} from "./modules/events";
import {DriverModule} from "./modules/driver";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true
        }),
        DatabaseModule.forRoot(),
        EventsModule.forRoot(),
        AuthModule,
        UserModule,
        RideModule,
        DriverModule
    ]
})
export class AppModule {}
