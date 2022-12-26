import {AdminResource} from "./admin-resource";
import {Injectable} from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import {Prisma} from "../../prisma";
import ModelName = Prisma.ModelName;
import passwordsFeature from "@adminjs/passwords";
import {ResourceOptions} from "adminjs";

@Injectable()
export class UserResource extends AdminResource {
    protected model: ModelName = 'User';

    protected options: ResourceOptions = {
        properties: {
            id: {
                position: 1,
                isId: true,
                type: 'uuid'
            },
            name: {
                position: 2,
                type: 'string'
            },
            password: {
                isVisible: false
            }
        },
        navigation: {
            name: 'Entities'
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
