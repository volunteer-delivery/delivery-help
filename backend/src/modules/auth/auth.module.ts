import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {SignInService} from "./services";
import {DatabaseModule} from "../database";
import {TokenModule} from "../common/token";

@Module({
    imports: [
        DatabaseModule,
        TokenModule
    ],
    controllers: [AuthController],
    providers: [SignInService]
})
export class AuthModule {}
