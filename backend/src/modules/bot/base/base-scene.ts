import {Inject, Injectable, OnModuleInit, Type} from "@nestjs/common";
import {Scenes} from "telegraf";
import {DynamicDependencyResolver} from "../../common";
import {BaseMiddleware, IInlineMiddleware} from "./base-middleware";
import {BaseComposer} from "./base-composer";

export type ISceneContext = Scenes.SceneContext;
export type IWizardSceneContext = Scenes.WizardContext;
export type IScene = Scenes.BaseScene<ISceneContext>;
export type ISceneDefinition<Context extends ISceneContext> = Type<BaseMiddleware> | IInlineMiddleware<Context> | Type<BaseComposer>;

type IStepObject = BaseMiddleware | BaseComposer;

export enum SceneType {
    WIZZARD = 'WIZZARD'
}

@Injectable()
export abstract class BaseScene<Context extends ISceneContext = any> implements OnModuleInit {
    @Inject()
    private resolver: DynamicDependencyResolver;

    abstract id: string;
    abstract type: SceneType;
    private steps: Array<BaseMiddleware | BaseComposer | IInlineMiddleware<Context>> = [];

    async onModuleInit(): Promise<void> {
        const middlewares: Type<IStepObject>[] = [];

        for (const Step of this.defineSteps()) {
            if (BaseMiddleware.isExtends(Step) || BaseComposer.isExtends(Step)) {
                middlewares.push(Step)
                continue;
            }

            this.steps.push(Step.bind(this));
        }

        this.steps.push(...await this.resolver.resolve(middlewares))
    }

    build(): Scenes.BaseScene<Context> {
        if (this.type === SceneType.WIZZARD) {
            // @ts-ignore
            return new Scenes.WizardScene(this.id, ...this.steps);
        }

        throw new Error('Undefined scene type');
    }

    getStep<TStep extends IStepObject>(Step: Type<TStep>): TStep | null {
        const step = this.steps.find(step => step.constructor === Step) as TStep;
        return step || null;
    }

    abstract defineSteps(): ISceneDefinition<Context>[];
}
