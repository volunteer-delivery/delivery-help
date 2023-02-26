import { IsNotEmpty, IsString } from 'class-validator';

export class AddCommentRequest {
    @IsString()
    @IsNotEmpty()
    public text: string;
}
