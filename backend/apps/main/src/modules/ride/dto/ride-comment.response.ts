import { RideComment, User } from '@app/prisma';
import { Exclude } from 'class-transformer';
import { UserResponse } from '../../user/dto';

export interface RideCommentResponseAttrs extends RideComment {
    author: User;
}

export class RideCommentResponse implements RideComment {
    public id: string;
    public text: string;
    public createdAt: Date;

    @Exclude()
    public authorId: string;

    public author: User;

    @Exclude()
    public rideId: string;

    constructor(comment: RideCommentResponseAttrs) {
        Object.assign(this, comment);
        this.author = new UserResponse(comment.author);
    }
}
