import {JwtModule} from "@nestjs/jwt";
import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {TokenService} from "./token.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],

            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow('BACKEND_SECRET')
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
