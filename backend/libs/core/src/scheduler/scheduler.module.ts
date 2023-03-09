import { DynamicModule, Provider, Type } from '@nestjs/common';
import { ScheduleModule as NestSchedulerModule } from '@nestjs/schedule';
import { DynamicDependencyResolver } from '../dynamic-dependency-resolver';
import { ISchedulerTask } from './scheduler-task';
import { SCHEDULER_TASKS, SchedulerInit } from './scheduler-init';

interface IWithScheduledProviders {
    providers?: Provider[];
    tasks: Type<ISchedulerTask>[];
}

export class SchedulerModule {
    public static forRoot(): DynamicModule {
        return {
            module: SchedulerModule,
            imports: [NestSchedulerModule.forRoot()],
        };
    }

    public static withScheduled({ providers, tasks }: IWithScheduledProviders): Provider[] {
        providers.push({
            provide: SCHEDULER_TASKS,
            useValue: tasks,
        });

        providers.push(SchedulerInit);

        if (!providers.includes(DynamicDependencyResolver)) {
            providers.push(DynamicDependencyResolver);
        }

        return providers;
    }
}
