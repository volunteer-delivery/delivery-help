import {Injectable} from "@nestjs/common";
import { Schema } from "mongoose";
import {Repository, ISchemaDefinition, IModel} from "./repository";
import {IUserModel, IPublicUserModel} from "./user.repository";

export interface IRideCommentModel extends IModel {
    createdAt: Date;
    author: IUserModel;
    text: string;
}

export type IPublicRideCommentModel = IRideCommentModel & {
    author: IPublicUserModel;
};

@Injectable()
export class RideCommentRepository extends Repository<IRideCommentModel> {
    name() {
        return 'RideComment';
    }

    defineSchema(): ISchemaDefinition<IRideCommentModel> {
        return {
            createdAt: {
                type: Date,
                required: true
            },

            author: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },

            text: {
                type: String,
                required: true
            }
        };
    }
}
