import {Schema, SchemaDefinition as Definition, SchemaDefinitionType} from "mongoose";
import {Injectable, Type} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";
import {DatabaseConnection, SchemaModel} from "../database.connection";

export type ISchemaDefinition<Doc> = Definition<SchemaDefinitionType<Doc>>;

export interface IModel {
    id: string;
}

export interface RepositoryOptions {
    name: string;
}

const REPOSITORY_METADATA = Symbol('repositoryMetadata');

export function Repository(options: RepositoryOptions): ClassDecorator {
    return (target: Function) => {
        target[REPOSITORY_METADATA] = options;
        Injectable()(target);
    };
}

@Injectable()
export abstract class BaseRepository<Doc> {
    protected readonly connection: DatabaseConnection;
    public readonly name: string;
    public readonly schema: Schema<Doc>;
    public readonly query: SchemaModel<Doc>;

    constructor(private moduleRef: ModuleRef) {
        const options = this.constructor[REPOSITORY_METADATA] as RepositoryOptions;

        this.connection = moduleRef.get(DatabaseConnection);
        this.schema = this.buildSchema();
        this.name = options.name;
        this.query = this.connection.buildQuery<Doc>(this.name, this.schema);
    }

    protected abstract defineSchema(): ISchemaDefinition<Doc>;

    private buildSchema(): Schema<Doc> {
        const schema = new Schema<Doc>(this.defineSchema());

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
