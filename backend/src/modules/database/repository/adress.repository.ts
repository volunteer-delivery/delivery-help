import {Injectable} from "@nestjs/common";
import {BaseRepository, ISchemaDefinition, IModel} from "./base-repository";

export interface IAdressModel extends IModel {
    country: string;
    city: string | null;
}

@Injectable()
export class AdressRepository extends BaseRepository<IAdressModel> {
    protected defineName() {
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
