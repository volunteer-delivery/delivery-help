import {JwtModule} from "@nestjs/jwt";
import {Module} from "@nestjs/common";
import {TokenService} from "./token.service";
import {EnvironmentService} from "@app/core/environment";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [EnvironmentService],

            useFactory: (environmentService: EnvironmentService) => ({
                secret: environmentService.secret
            })
        })
    ],

    providers: [
        TokenService
    ],

    exports: [
        TokenService
    ]
})
export class TokenModule {}
