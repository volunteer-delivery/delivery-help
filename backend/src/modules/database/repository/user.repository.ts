import {Injectable} from "@nestjs/common";
import {Repository, ISchemaDefinition, IModel} from "./repository";

export interface IUserModel extends IModel {
    name: string;
    _password: string;
}

@Injectable()
export class UserRepository extends Repository<IUserModel>{
    name() {
        return 'User';
    }

    defineSchema(): ISchemaDefinition<IUserModel> {
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
