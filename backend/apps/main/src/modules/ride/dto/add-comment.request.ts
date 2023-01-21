import {IsNotEmpty, IsString} from "class-validator";

export class AddCommentRequest {
    @IsString()
    @IsNotEmpty()
    text: string;
}
