import {Injectable} from "@nestjs/common";
import {Repository, ISchemaDefinition, IModel} from "./repository";

export interface IAdressModel extends IModel {
    country: string;
    city: string | null;
}

@Injectable()
export class AdressRepository extends Repository<IAdressModel> {
    protected name() {
        return 'Adress';
    }

    protected defineSchema(): ISchemaDefinition<IAdressModel> {
        return {
            country: {
                type: String,
                required: true
            },

            city: {
                type: String,
                required: false
            }
        };
    }
}
