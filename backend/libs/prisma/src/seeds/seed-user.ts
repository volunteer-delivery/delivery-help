import * as bcrypt from 'bcryptjs';
import {User} from "../client";
import {client} from "./client-provider";

export function seedUser(): Promise<User> {
    return client.user.upsert({
        where: { name: 'beta' },
        create: {
            name: 'beta',
            password: bcrypt.hashSync('password', 10)
        },
        update: {}
    })
}
