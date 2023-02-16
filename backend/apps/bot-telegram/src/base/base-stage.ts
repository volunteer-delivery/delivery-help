import { Inject, Injectable, OnModuleInit, Type } from '@nestjs/common';
import { Context, MiddlewareFn, MiddlewareObj, Scenes } from 'telegraf';
import { DynamicDependencyResolver } from '@app/core/dynamic-dependency-resolver';
import { BaseScene, IScene, ISceneContext } from './base-scene';

@Injectable()
export abstract class BaseStage implements MiddlewareObj<Context>, OnModuleInit {
    @Inject()
    private resolver: DynamicDependencyResolver;

    private scenes: IScene[] = [];

    protected abstract defineScenes(): Type<BaseScene>[];

    public async onModuleInit(): Promise<void> {
        const scenes = await this.resolver.resolve<BaseScene>(this.defineScenes());
        this.scenes = scenes.map((scene) => scene.build());
    }

    public middleware(): MiddlewareFn<Context> {
        return new Scenes.Stage<ISceneContext>(this.scenes, { ttl: 2 * 60 }).middleware();
    }
}
