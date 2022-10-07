import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthCookieService, SignInService} from "./services";
import {TokenModule} from "../common/token";
import {AuthGuard} from "./guard";

@Module({
    imports: [TokenModule],
    controllers: [AuthController],
    providers: [
        SignInService,
        AuthCookieService,
        AuthGuard
    ],
    exports: [
        AuthGuard
    ]
})
export class AuthModule {}
