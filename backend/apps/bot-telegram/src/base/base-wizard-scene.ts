import { Scenes } from 'telegraf';
import { Injectable } from '@nestjs/common';
import { BaseScene, IScene, IWizardSceneContext, SceneType } from './base-scene';

@Injectable()
export abstract class BaseWizardScene<TContext extends IWizardSceneContext = IWizardSceneContext> extends BaseScene<TContext> {
    protected type = SceneType.WIZZARD;

    public build(): IScene<TContext> {
        // @ts-ignore Fix fucking difference in Context types that WizardScene requires and that it exports
        return new Scenes.WizardScene<TContext>(this.id, ...this.steps);
    }
}
