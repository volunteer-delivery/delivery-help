import {Injectable} from "@nestjs/common";
import mongoose, {InferSchemaType,Model,ObtainSchemaGeneric,Schema} from "mongoose";

type InferedModel<Doc extends any> = InferSchemaType<Schema<Doc>>;
type QueryHelpers<Doc extends any> = ObtainSchemaGeneric<Schema<Doc>, 'TQueryHelpers'>;
type InstanceMethods<Doc extends any> = ObtainSchemaGeneric<Schema<Doc>, 'TInstanceMethods'>;
type StaticMethods<Doc extends any> = ObtainSchemaGeneric<Schema<Doc>, 'TStaticMethods'>;
export type SchemaModel<Doc extends any> = Model<InferedModel<Doc>, QueryHelpers<Doc>, InstanceMethods<Doc>, {}, Schema<Doc>> & StaticMethods<Doc>

@Injectable()
export class DatabaseConnection {
    async connect(url: string): Promise<void> {
        await mongoose.connect(url);
    }

    async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }

    buildQuery<Doc>(name: string, schema: Schema<Doc>): SchemaModel<Doc> {
        return mongoose.model(name, schema);
    }
}
