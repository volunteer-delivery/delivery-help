import {AdminResource} from "./admin-resource";
import {ResourceOptions} from "adminjs";
import {Prisma} from "../prisma";

export class AddressResource extends AdminResource {
    protected model: Prisma.ModelName = 'Address';

    protected options: ResourceOptions = {
        properties: {
            id: {
                position: 1,
                isId: true
            },
            country: {
                position: 2,
                type: 'string'
            },
            city: {
                position: 3,
                isTitle: true,
                type: 'string'
            }
        },
        navigation: false
    }
}
