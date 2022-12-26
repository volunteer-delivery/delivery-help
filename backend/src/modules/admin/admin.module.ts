import {Module} from "@nestjs/common";
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
import {AdminConfig} from "./admin.config";
import {DynamicDependencyResolver} from "../common";

@Module({
    providers: [DynamicDependencyResolver],
    exports: [DynamicDependencyResolver]
})
class ConfigModule {}

@Module({
    imports: [
        AdminJsModule.createAdminAsync({
            imports: [ConfigModule],
            inject: [DynamicDependencyResolver],

            useFactory: async (resolver: DynamicDependencyResolver) => {
                const config = await resolver.resolve(AdminConfig)
                return config.build();
            }
        })
    ]
})
export class AdminModule {}
