import {RideComment, User} from "../../prisma";
import {Exclude} from "class-transformer";
import {UserResponse} from "../../user/dto";

export interface RideCommentResponseAttrs extends RideComment {
    author: User;
}

export class RideCommentResponse implements RideComment {
    id: string;
    text: string;
    createdAt: Date;

    @Exclude()
    authorId: string;
    author: User;

    @Exclude()
    rideId: string;

    constructor(comment: RideCommentResponseAttrs) {
        Object.assign(this, comment);
        this.author = new UserResponse(comment.author);
    }
}
