import * as bcrypt from "bcryptjs";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SignInCredentials} from "../dto";
import {IUserModel, UserRepository} from "../../database";
import {TokenService} from "../../common/token";

interface IAuthToken {
    token: string;
    expiresIn: number;
}

@Injectable()
export class SignInService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService,
        private readonly configService: ConfigService
    ) {}

    async validateCredentials(credentials: SignInCredentials): Promise<IUserModel | false> {
        const user = await this.userRepository.findOne({name: credentials.username});
        const isCredentialsValid = user && await bcrypt.compare(credentials.password, user._password);

        return isCredentialsValid ? user : false;
    }

    async generateToken(user: IUserModel): Promise<IAuthToken> {
        const expiresIn = this.configService.getOrThrow<number>('BACKEND_AUTH_EXPIRATION', {infer: true});
        const token = await this.tokenService.encode({userId: user.id}, {expiresIn});

        return {expiresIn, token};
    }
}
