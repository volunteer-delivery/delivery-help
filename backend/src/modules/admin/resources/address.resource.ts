import {AdminResource} from "./admin-resource";
import {Injectable} from "@nestjs/common";
import {ResourceOptions} from "adminjs";
import {Prisma} from "../../prisma";

@Injectable()
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
