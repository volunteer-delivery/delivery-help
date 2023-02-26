import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { EnvironmentService } from '@app/core/environment';
import { TokenService } from './token.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [EnvironmentService],

            useFactory: (environmentService: EnvironmentService) => ({
                secret: environmentService.secret,
            }),
        }),
    ],

    providers: [
        TokenService,
    ],

    exports: [
        TokenService,
    ],
})
export class TokenModule {}
