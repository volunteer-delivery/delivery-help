import {AdminResource} from "./admin-resource";
import bcrypt from 'bcryptjs';
import {Prisma} from "../prisma";
import passwordsFeature from "@adminjs/passwords";
import {ResourceOptions} from "adminjs";

export class UserResource extends AdminResource {
    protected model: Prisma.ModelName = 'User';

    protected options: ResourceOptions = {
        properties: {
            id: {
                position: 1,
                isId: true,
                type: 'uuid',
                isVisible: {
                    show: true
                }
            },
            name: {
                position: 2,
                type: 'string',
                isTitle: true
            },
            password: {
                isVisible: false
            }
        },
        navigation: {
            icon: 'User'
        }
    };

    protected features = [
        passwordsFeature({
            properties: {
                password: 'newPassword',
                encryptedPassword: 'password'
            },
            hash: (password: string) => bcrypt.hash(password, 10)
        })
    ]
}
