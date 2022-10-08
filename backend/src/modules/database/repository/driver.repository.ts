import {Injectable} from "@nestjs/common";
import {Repository, ISchemaDefinition, IModel} from "./repository";

export enum DriverGrade {
    VERIFIED = 'VERIFIED',
    NOT_VERIFIED = 'NOT VERIFIED'
}

export interface IDriverModel extends IModel {
    name: string;
    phone: string;
    grade: DriverGrade;
    _telegramId: string | null;
}

@Injectable()
export class DriverRepository extends Repository<IDriverModel>{
    name() {
        return 'Driver';
    }

    defineSchema(): ISchemaDefinition<IDriverModel> {
        return {
            name: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            grade: {
                type: String,
                enum: Object.values(DriverGrade),
                default: DriverGrade.NOT_VERIFIED,
                required: true
            },

            _telegramId: {
                type: String,
                required: false,
                default: null
            }
        };
    }
}
