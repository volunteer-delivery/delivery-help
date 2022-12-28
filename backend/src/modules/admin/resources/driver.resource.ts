import {Injectable} from "@nestjs/common";
import {ResourceOptions} from "adminjs";
import {Prisma} from "../../prisma";
import {AdminResource} from "./admin-resource";

@Injectable()
export class DriverResource extends AdminResource {
    protected model: Prisma.ModelName = 'Driver';

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
            telegramId: {
                isVisible: false
            },
            name: {
                type: 'string',
                position: 2,
                isTitle: true
            },
            phone: {
                type: 'phone',
                position: 3
            }
        },
        navigation: {
            icon: 'Car'
        },
        actions: {
            new: {
                isVisible: false
            }
        }
    };
}
