import { User } from '@app/prisma';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
    public id: string;
    public name: string;

    @Exclude()
    public password: string;

    constructor(user: User) {
        Object.assign(this, user);
    }
}
