import {Schema, SchemaDefinition as Definition, SchemaDefinitionType} from "mongoose";
import {Injectable, Type} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";
import {DatabaseConnection, SchemaModel} from "../database.connection";

export type ISchemaDefinition<Doc> = Definition<SchemaDefinitionType<Doc>>;

export interface IModel {
    id: string;
}

@Injectable()
export abstract class BaseRepository<Doc> {
    protected readonly connection: DatabaseConnection;
    public readonly name: string;
    public readonly schema: Schema<Doc>;
    public readonly query: SchemaModel<Doc>;

    constructor(private readonly moduleRef: ModuleRef) {
        this.connection = moduleRef.get(DatabaseConnection);
        this.schema = this.buildSchema();
        this.name = this.defineName();
        this.query = this.connection.buildQuery<Doc>(this.name, this.schema);
    }

    protected abstract defineName(): string;
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
