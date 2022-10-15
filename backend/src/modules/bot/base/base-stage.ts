import {Inject, Injectable, OnModuleInit, Type} from "@nestjs/common";
import {Context, MiddlewareObj, Scenes} from "telegraf";
import {DynamicDependencyResolver} from "../../common";
import {BaseScene, IScene, ISceneContext} from "./base-scene";

@Injectable()
export abstract class BaseStage implements MiddlewareObj<Context>, OnModuleInit {
    @Inject()
    private resolver: DynamicDependencyResolver;
    private scenes: IScene[] = [];

    abstract defineScenes(): Type<BaseScene>[];

    async onModuleInit(): Promise<void> {
        const scenes = await this.resolver.resolve<BaseScene>(this.defineScenes())
        this.scenes = scenes.map(scene => scene.build());
    }

    middleware() {
        return new Scenes.Stage<ISceneContext>(this.scenes, { ttl: 2 * 60 }).middleware();
    }
}
