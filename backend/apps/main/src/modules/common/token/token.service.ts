import {JwtService, JwtSignOptions} from '@nestjs/jwt';
import {Inject, Injectable} from "@nestjs/common";

@Injectable()
export class TokenService {
    @Inject()
    private jwtService: JwtService;

    encode<Payload extends {}>(payload: Payload, options: JwtSignOptions): Promise<string> {
        return this.jwtService.signAsync(payload, options)
    }

    decode<Payload extends {}>(token: string): Promise<Payload> {
        return this.jwtService.verifyAsync(token)
    }

    decodeOrNull<Payload extends {}>(token: string): Promise<Payload | null> {
        return this.decode(token).catch(() => null);
    }
}
