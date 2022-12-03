import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {PrismaModule} from "./modules/prisma";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true
        }),
        PrismaModule
    ]
})
export class ConsoleModule {}
