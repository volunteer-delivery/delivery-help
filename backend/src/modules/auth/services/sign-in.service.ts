import * as bcrypt from "bcryptjs";
import {Inject, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SignInCredentials} from "../dto";
import {IUserModel, UserRepository} from "../../database";
import {TokenService} from "../../common/token";

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
    private userRepository: UserRepository;

    @Inject()
    private tokenService: TokenService;

    @Inject()
    private configService: ConfigService;

    async validateCredentials(credentials: SignInCredentials): Promise<IUserModel | false> {
        const user = await this.userRepository.query.findOne({name: credentials.username}).exec();
        const isCredentialsValid = user && await bcrypt.compare(credentials.password, user._password);

        return isCredentialsValid ? user : false;
    }

    async generateToken(user: IUserModel): Promise<IAuthToken> {
        const payload = {userId: user.id};
        const options = {expiresIn: this.authExpiration};
        const token = await this.tokenService.encode<IAuthTokenPayload>(payload, options);

        return {expiresIn: this.authExpiration, token};
    }

    private get authExpiration(): number {
        return this.configService.getOrThrow<number>('BACKEND_AUTH_EXPIRATION', {infer: true});
    }
}
