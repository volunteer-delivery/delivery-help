import {User} from "../../prisma";
import {UserResponse} from "./user.response";

export class CurrentUserResponse {
    user: User;

    constructor(user: User) {
        this.user = new UserResponse(user);
    }
}
