import { CronJob } from 'cron';
import { Inject, Injectable, Logger, OnApplicationBootstrap, Type } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { DynamicDependencyResolver } from '../dynamic-dependency-resolver';
import { ISchedulerTask } from './scheduler-task';

export const SCHEDULER_TASKS = Symbol('SchedulerTasks');

@Injectable()
export class SchedulerInit implements OnApplicationBootstrap {
    private logger = new Logger(this.constructor.name);

    @Inject(SCHEDULER_TASKS)
    private tasksClasses: Type<ISchedulerTask>[];

    @Inject()
    private schedulerRegistry: SchedulerRegistry;

    @Inject()
    private dependencyResolver: DynamicDependencyResolver;

    public async onApplicationBootstrap(): Promise<void> {
        const tasks = await this.initializeTasks();

        for (const schedulerTask of tasks) {
            this.scheduleCronJob(schedulerTask);
            this.logger.log(`Scheduled cron job ${schedulerTask.name} at ${schedulerTask.cron}`);
        }
    }

    private initializeTasks(): Promise<ISchedulerTask[]> {
        return this.dependencyResolver.resolve(this.tasksClasses);
    }

    private scheduleCronJob(task: ISchedulerTask): void {
        this.schedulerRegistry.addCronJob(task.name, new CronJob({
            cronTime: task.cron,
            start: true,
            onTick: () => task.perform(),
        }));
    }
}
