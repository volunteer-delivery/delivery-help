import {CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Request, Response} from "express";
import {TokenService} from "../../common/token";
import {IUserModel, UserRepository} from "../../database";
import {AuthCookieService, IAuthTokenPayload} from "../services";

export type ISignedRequest = Request & { user?: IUserModel };

@Injectable()
export class AuthGuard implements CanActivate {
    static readonly PUBLIC_API_METADATA = Symbol('publicEndpoint');

    @Inject()
    private reflector: Reflector;

    @Inject()
    private tokenService: TokenService;

    @Inject()
    private userRepository: UserRepository;

    @Inject()
    private cookieService: AuthCookieService;

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http = context.switchToHttp();
        const request = http.getRequest<ISignedRequest>();
        const response = http.getResponse<Response>();

        if (this.isPublic(context)) return true;

        const user = await this.fetchUserByToken(request.signedCookies['dh.auth']);

        if (!user) {
            this.cookieService.clear(response);
            return false;
        }

        request.user = user;
        return true;
    }

    private isPublic(context: ExecutionContext): boolean {
        const key = AuthGuard.PUBLIC_API_METADATA;
        if (this.reflector.get(key, context.getHandler())) return true;
        if (this.reflector.get(key, context.getClass())) return true;
        return false;
    }

    private async fetchUserByToken(token: string): Promise<IUserModel | null> {
        const tokenPayload = token && await this.tokenService.decodeOrNull<IAuthTokenPayload>(token);
        return tokenPayload && await this.userRepository.query.findById(tokenPayload.userId).exec();
    }
}
