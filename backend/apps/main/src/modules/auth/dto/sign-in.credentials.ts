import { IsNotEmpty, IsString } from 'class-validator';

export class SignInCredentials {
    @IsString()
    @IsNotEmpty()
    public username: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
}
