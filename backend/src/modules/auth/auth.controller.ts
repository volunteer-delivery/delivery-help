import {Body, Controller, Post, Res, UnprocessableEntityException} from "@nestjs/common";
import {Response} from 'express';
import {SignInCredentials} from "./dto";
import {ISuccessResponse} from "../common/types";
import {SignInService} from "./services";
import {TokenService} from "../common/token";

const messages = {
    invalidCredentials: 'Невірно введене імʼя користувача або пароль'
};

@Controller('auth')
export class AuthController {
    constructor(
        private readonly signInService: SignInService,
        private readonly tokenService: TokenService
    ) {}

    @Post('sign-in')
    public async signIn(
        @Res({passthrough: true}) response: Response,
        @Body() body: SignInCredentials
    ): Promise<ISuccessResponse> {
        const user = await this.signInService.validateCredentials({
            username: body.username.trim(),
            password: body.password.trim()
        });

        if (!user) throw new UnprocessableEntityException(messages.invalidCredentials);

        const {token, expiresIn} = await this.signInService.generateToken(user);
        const session = await this.tokenService.encode({auth: true}, {expiresIn});

        response.cookie('dh.auth', token, {signed: true, httpOnly: true, maxAge: expiresIn});
        response.cookie('dh.session', session, {signed: true, maxAge: expiresIn});

        return {success: true};
    }
}