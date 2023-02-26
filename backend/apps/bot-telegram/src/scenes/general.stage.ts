import { Injectable, Type } from '@nestjs/common';
import { BaseStage, BaseScene } from '../base';
import { NewDriverScene } from './new-driver';
import { NewRideScene } from './new-ride';

@Injectable()
export class GeneralStage extends BaseStage {
    protected defineScenes(): Type<BaseScene>[] {
        return [NewDriverScene, NewRideScene];
    }
}
