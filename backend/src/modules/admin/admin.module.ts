import {Module} from "@nestjs/common";
import {AdminModule as AdminJsModule} from '@adminjs/nestjs';
import {AdminConfig} from "./admin.config";
import {DynamicDependencyResolver} from "../common";

@Module({
    providers: [AdminConfig, DynamicDependencyResolver],
    exports: [AdminConfig, DynamicDependencyResolver]
})
class ConfigModule {}

@Module({
    imports: [
        AdminJsModule.createAdminAsync({
            imports: [ConfigModule],
            inject: [AdminConfig],
            useFactory: (config) => config.build()
        })
    ]
})
export class AdminModule {}
