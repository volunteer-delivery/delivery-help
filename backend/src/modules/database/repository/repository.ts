import {InferSchemaType,model,Model,ObtainSchemaGeneric,Schema,SchemaDefinition as Definition,SchemaDefinitionType} from "mongoose";
import {Injectable, Type} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";

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
    public readonly schema: Schema<DocType> = this.buildSchema();
    public readonly query: SchemaModel<DocType> = model(this.name(), this.schema);

    constructor(private readonly moduleRef: ModuleRef) {}

    abstract name(): string;
    abstract defineSchema(): ISchemaDefinition<DocType>;

    private buildSchema(): Schema<DocType> {
        const schema = new Schema<DocType>(this.defineSchema());

        schema.virtual('id').get(function () {
            return this._id.toHexString();
        });

        schema.set('toJSON', {
            virtuals: true,

            transform: (_, converted) => {
                for (const key of Object.keys(converted)) {
                    if (key.startsWith('_')) delete converted[key];
                }
            }
        });

        return schema;
    }

    protected requireSchema(Class: Type): Schema {
        return this.moduleRef.get(Class).schema;
    }
}
