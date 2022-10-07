import {
    FilterQuery,
    InferSchemaType,
    model as schemaModel,
    Model,
    ObtainSchemaGeneric,
    Schema,
    SchemaDefinition as Definition,
    SchemaDefinitionType
} from "mongoose";
import {Injectable} from "@nestjs/common";

export type ISchemaDefinition<DocType> = Definition<SchemaDefinitionType<DocType>>;

type SchemaModel<TModel extends any> = Model<
    InferSchemaType<Schema<TModel>>,
    ObtainSchemaGeneric<Schema<TModel>, 'TQueryHelpers'>,
    ObtainSchemaGeneric<Schema<TModel>, 'TInstanceMethods'>,
    {}, Schema<TModel>
    >
    & ObtainSchemaGeneric<Schema<TModel>, 'TStaticMethods'>

type ExcludeKeysStartsWith<Set, Needle extends string> = Set extends `${Needle}${infer _X}` ? never : Set;
export type IPublicModel<Type> = Pick<Type, ExcludeKeysStartsWith<keyof Type, '_'>>

export interface IModel {
    id: string;
}

@Injectable()
export abstract class Repository<DocType> {
    abstract name(): string;
    abstract defineSchema(): ISchemaDefinition<DocType>;

    public readonly schema: Schema<DocType> = this.buildSchema();
    protected model: SchemaModel<DocType> = schemaModel(this.name(), this.schema);

    private buildSchema(): Schema<DocType> {
        const schema = new Schema<DocType>(this.defineSchema());

        schema.virtual('id').get(function () {
            return this._id.toHexString();
        });

        schema.set('toJSON', {
            virtuals: true,

            transform: (_, converted) => {
                delete converted._id;
                delete converted.__v;
                delete converted._telegramId;
                delete converted._password;
            }
        });

        return schema;
    }

    findOne(filter?: FilterQuery<DocType>) {
        return this.model.findOne(filter).exec();
    }
}
