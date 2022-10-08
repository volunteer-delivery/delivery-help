import {Injectable} from "@nestjs/common";
import {BaseRepository, ISchemaDefinition, IModel} from "./base-repository";

export interface IUserModel extends IModel {
    name: string;
    _password: string;
}

@Injectable()
export class UserRepository extends BaseRepository<IUserModel>{
    protected defineName() {
        return 'User';
    }

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
