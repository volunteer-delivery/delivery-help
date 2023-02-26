import { Module } from '@nestjs/common';
import { TokenModule } from '../common/token';
import { AuthController } from './auth.controller';
import { AuthCookieService, SignInService } from './services';
import { AuthGuard } from './guard';

@Module({
    imports: [TokenModule],
    controllers: [AuthController],
    providers: [
        SignInService,
        AuthCookieService,
        AuthGuard,
    ],
    exports: [
        AuthGuard,
    ],
})
export class AuthModule {}
