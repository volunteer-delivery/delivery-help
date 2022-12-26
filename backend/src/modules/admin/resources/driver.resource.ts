import {Injectable} from "@nestjs/common";
import {ResourceOptions} from "adminjs";
import {Prisma} from "../../prisma";
import {AdminResource} from "./admin-resource";
import ModelName = Prisma.ModelName;

@Injectable()
export class DriverResource extends AdminResource {
    protected model: ModelName = 'Driver';

    protected options: ResourceOptions = {
        properties: {
            id: {
                isId: true,
                position: 1,
                type: 'uuid'
            },
            telegramId: {
                isVisible: false
            },
            name: {
                type: 'string',
                position: 2
            },
            phone: {
                type: 'phone',
                position: 3
            }
        },
        navigation: {
            name: 'Driver',
            icon: 'Car'
        }
    };
}
