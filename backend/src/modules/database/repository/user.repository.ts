import {Injectable} from "@nestjs/common";
import {Repository, ISchemaDefinition, IPublicModel, IModel} from "./repository";

export interface IUserModel extends IModel {
    name: string;
    _password: string;
}

export type IPublicUserModel = IPublicModel<IUserModel>;

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