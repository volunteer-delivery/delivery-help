import { Body, Controller, Inject, Post, Res, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';
import { TokenService } from '../common/token';
import { ISuccessResponse } from '../common/types';
import { CurrentUserResponse } from '../user/dto';
import { SignInCredentials } from './dto';
import { AuthCookieService, SignInService } from './services';
import { PublicApi } from './guard';

@Controller('auth')
@PublicApi()
export class AuthController {
    @Inject()
    private signInService: SignInService;

    @Inject()
    private tokenService: TokenService;

    @Inject()
    private cookieService: AuthCookieService;

    @Post('sign-in')
    public async signIn(
        @Res({ passthrough: true }) response: Response,
        @Body() body: SignInCredentials,
    ): Promise<CurrentUserResponse> {
        const user = await this.signInService.validateCredentials({
            username: body.username.trim(),
            password: body.password.trim(),
        });

        if (!user) throw new UnprocessableEntityException('Невірно введене імʼя користувача або пароль');

        const { token, expiresIn } = await this.signInService.generateToken(user);
        const session = await this.tokenService.encode({ auth: true }, { expiresIn });

        this.cookieService.write(response, {
            authToken: token,
            sessionToken: session,
            expiresIn,
        });

        return new CurrentUserResponse(user);
    }

    @Post('sign-out')
    public signOut(@Res({ passthrough: true }) response: Response): ISuccessResponse {
        this.cookieService.clear(response);
        return { success: true };
    }
}
