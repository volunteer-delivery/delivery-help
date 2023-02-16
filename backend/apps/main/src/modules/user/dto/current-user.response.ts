import { User } from '@app/prisma';
import { UserResponse } from './user.response';

export class CurrentUserResponse {
    public user: User;

    constructor(user: User) {
        this.user = new UserResponse(user);
    }
}
