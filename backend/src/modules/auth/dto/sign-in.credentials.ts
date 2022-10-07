import {IsNotEmpty, IsString} from "class-validator";

export class SignInCredentials {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}