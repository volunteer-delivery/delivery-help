import {Global, Module} from "@nestjs/common";
import {PrismaService} from "./prisma.service";
import {EnvironmentModule} from "@app/core/environment";

@Global()
@Module({
    imports: [EnvironmentModule],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {}
