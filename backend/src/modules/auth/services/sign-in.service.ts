import * as bcrypt from "bcryptjs";
import {Inject, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SignInCredentials} from "../dto";
import {TokenService} from "../../common/token";
import {PrismaService, User} from "../../prisma";

interface IAuthToken {
    token: string;
    expiresIn: number;
}

export interface IAuthTokenPayload {
    userId: string;
}

@Injectable()
export class SignInService {
    @Inject()
    private prisma: PrismaService;

    @Inject()
    private tokenService: TokenService;

    @Inject()
    private configService: ConfigService;

    async validateCredentials(credentials: SignInCredentials): Promise<User | false> {
        const user = await this.prisma.user.findUnique({ where: { name: credentials.username } });
        const isCredentialsValid = user && await bcrypt.compare(credentials.password, user.password);

        return isCredentialsValid ? user : false;
    }

    async generateToken(user: User): Promise<IAuthToken> {
        const payload = {userId: user.id};
        const options = {expiresIn: this.authExpiration};
        const token = await this.tokenService.encode<IAuthTokenPayload>(payload, options);

        return {expiresIn: this.authExpiration, token};
    }

    private get authExpiration(): number {
        return this.configService.getOrThrow<number>('BACKEND_AUTH_EXPIRATION', {infer: true});
    }
}
