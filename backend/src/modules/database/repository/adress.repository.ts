import {BaseRepository, Repository, ISchemaDefinition, IModel} from "./base-repository";

export interface IAdressModel extends IModel {
    country: string;
    city: string | null;
}

@Repository({name: 'Adress'})
export class AdressRepository extends BaseRepository<IAdressModel> {
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
