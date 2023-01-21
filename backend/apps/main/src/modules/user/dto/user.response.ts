import {User} from "@app/prisma";
import {Exclude} from "class-transformer";

export class UserResponse implements User {
    id: string;
    name: string

    @Exclude()
    password: string;

    constructor(user: User) {
        Object.assign(this, user);
    }
}
