import {Schema} from "mongoose";
import {BaseRepository, ISchemaDefinition, IModel, Repository} from "./base-repository";
import {IUserModel} from "./user.repository";

export interface IRideCommentModel extends IModel {
    createdAt: Date;
    author: IUserModel;
    text: string;
}

@Repository({name: 'RideComment'})
export class RideCommentRepository extends BaseRepository<IRideCommentModel> {
    protected defineSchema(): ISchemaDefinition<IRideCommentModel> {
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
