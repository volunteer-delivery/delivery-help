import { Type } from '@nestjs/common';
import { Types } from 'telegraf';
import { ISceneContext } from './base-scene';

export type IComposeEvent = Types.UpdateType | Types.MessageSubType;
export type IComposeAction = string | RegExp;
export type IComposeHandler = (context: ISceneContext) => void | Promise<void>;

interface EventHandler<TKey> {
    key: TKey;
    handler: IComposeHandler;
}

export class ComposerMetadata {
    private static KEY = Symbol(this.name);

    public static resolve(Class: Type | Function): ComposerMetadata {
        if (!Reflect.hasMetadata(this.KEY, Class)) {
            Reflect.defineMetadata(this.KEY, this.empty(), Class);
        }
        return Reflect.getMetadata(this.KEY, Class);
    }

    private static empty(): ComposerMetadata {
        return new ComposerMetadata();
    }

    public readonly events: EventHandler<IComposeEvent>[] = [];
    public readonly actions: EventHandler<IComposeAction>[] = [];

    public addEvent(key: IComposeEvent, handler: IComposeHandler): void {
        this.events.push({ key, handler });
    }

    public addAction(key: IComposeAction, handler: IComposeHandler): void {
        this.actions.push({ key, handler });
    }
}
