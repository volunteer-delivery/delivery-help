import {BaseRepository, ISchemaDefinition, IModel, Repository} from "./base-repository";

export interface IUserModel extends IModel {
    name: string;
    _password: string;
}

@Repository({name: 'User'})
export class UserRepository extends BaseRepository<IUserModel> {
    protected defineSchema(): ISchemaDefinition<IUserModel> {
        return {
            name: {
                type: String,
                required: true
            },

            _password: {
                type: String,
                required: true
            }
        };
    }
}
