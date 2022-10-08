import {Injectable} from "@nestjs/common";
import {Schema} from "mongoose";
import {Repository, ISchemaDefinition, IModel} from "./repository";
import {IDriverModel} from "./driver.repository";
import {AdressRepository, IAdressModel} from "./adress.repository";
import {IUserModel} from "./user.repository";
import {IRideCommentModel} from "./ride-comment.repository";

export enum Vehicle {
    CAR = 'CAR',
    VAN = 'VAN',
    TRUCK = 'TRUCK'
}

export enum RideStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

export interface IRideModel extends IModel {
    driver: IDriverModel;
    from: IAdressModel;
    destination: IAdressModel;
    departureTime: Date;
    vehicle: Vehicle;
    status: RideStatus;
    volunteer: IUserModel | null;
    comments: IRideCommentModel[] | null;
}

@Injectable()
export class RideRepository extends Repository<IRideModel> {
    protected name() {
        return 'Ride';
    }

    protected defineSchema(): ISchemaDefinition<IRideModel> {
        return {
            driver: {
                type: Schema.Types.ObjectId,
                ref: 'Driver',
                required: true
            },

            from: {
                type: this.requireSchema(AdressRepository),
                required: true
            },

            destination: {
                type: this.requireSchema(AdressRepository),
                required: true
            },

            departureTime: {
                type: Date,
                required: true
            },

            vehicle: {
                type: String,
                enum: Object.values(Vehicle),
                required: false
            },

            status: {
                type: String,
                enum: Object.values(RideStatus),
                default: RideStatus.PENDING,
                required: true
            },

            comments: [{
                type: Schema.Types.ObjectId,
                ref: 'RideComment'
            }],

            volunteer: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: false,
                default: null
            }
        };
    }
}
