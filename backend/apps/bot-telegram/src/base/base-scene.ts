import {Inject, Injectable, OnModuleInit, Type} from "@nestjs/common";
import {Scenes} from "telegraf";
import {DynamicDependencyResolver} from "@app/core/dynamic-dependency-resolver";
import {BaseMiddleware, IInlineMiddleware} from "./base-middleware";
import {BaseComposer} from "./base-composer";

export type ISceneContext = Scenes.SceneContext;
export type IWizardSceneContext = Scenes.WizardContext;
export type IScene<TContext extends ISceneContext = ISceneContext> = Scenes.BaseScene<TContext>;
export type ISceneDefinition<TContext extends ISceneContext> = Type<BaseMiddleware> | IInlineMiddleware<TContext> | Type<BaseComposer>;

type IStepObject = BaseMiddleware | BaseComposer;
type IResolvedStep<TContext extends ISceneContext> = IStepObject | IInlineMiddleware<TContext>;

export enum SceneType {
    WIZZARD = 'WIZZARD'
}

@Injectable()
export abstract class BaseScene<TContext extends ISceneContext = any> implements OnModuleInit {
    @Inject()
    private resolver: DynamicDependencyResolver;

    abstract id: string;
    abstract type: SceneType;
    protected steps: IResolvedStep<TContext>[] = [];

    async onModuleInit(): Promise<void> {
        this.steps = await Promise.all(this.defineSteps().map(this.resolveStep.bind(this)));
    }

    private async resolveStep(Step: ISceneDefinition<TContext>): Promise<IResolvedStep<TContext>> {
        if (BaseMiddleware.isExtends(Step)) {
            return this.resolver.resolve(Step);
        }
        if (BaseComposer.isExtends(Step)) {
            return this.resolver.resolve(Step);
        }
        return Step.bind(this);
    }

    abstract build(): Scenes.BaseScene<TContext>;
    abstract defineSteps(): ISceneDefinition<TContext>[];

    getStep<TStep extends IStepObject>(Step: Type<TStep>): TStep | null {
        const step = this.steps.find(step => step.constructor === Step) as TStep;
        return step || null;
    }
}
