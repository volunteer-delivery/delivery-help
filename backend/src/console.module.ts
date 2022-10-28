import {Module} from "@nestjs/common";
import {DatabaseModule} from "./modules/database";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true
        }),
        DatabaseModule
    ]
})
export class ConsoleModule {}
