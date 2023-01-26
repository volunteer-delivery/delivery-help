import {Injectable} from "@nestjs/common";
import {Response} from 'express';

interface IWriteOptions {
    authToken: string;
    sessionToken: string;
    expiresIn: number;
}

@Injectable()
export class AuthCookieService {
    private static readonly AUTH_COOKIE = 'dh.auth';
    private static readonly SESSION_COOKIE = 'dh.session';

    write(response: Response, options: IWriteOptions): void {
        response.cookie(AuthCookieService.AUTH_COOKIE, options.authToken, {
            signed: true,
            httpOnly: true,
            maxAge: options.expiresIn
        });

        response.cookie(AuthCookieService.SESSION_COOKIE, options.sessionToken, {
            signed: true,
            maxAge: options.expiresIn
        });
    }

    clear(response: Response) {
        response.clearCookie(AuthCookieService.AUTH_COOKIE);
        response.clearCookie(AuthCookieService.SESSION_COOKIE);
    }
}
