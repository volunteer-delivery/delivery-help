import {BaseRepository, ISchemaDefinition, IModel, Repository} from "./base-repository";

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

@Repository({name: 'Driver'})
export class DriverRepository extends BaseRepository<IDriverModel> {
    protected defineSchema(): ISchemaDefinition<IDriverModel> {
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
