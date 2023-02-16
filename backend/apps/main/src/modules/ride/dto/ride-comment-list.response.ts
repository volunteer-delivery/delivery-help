import { RideCommentResponse, RideCommentResponseAttrs } from './ride-comment.response';

export class RideCommentListResponse {
    public comments: RideCommentResponse[];

    constructor(comments: RideCommentResponseAttrs[]) {
        this.comments = comments.map((comment) => new RideCommentResponse(comment));
    }
}
