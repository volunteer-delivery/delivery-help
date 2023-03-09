export interface ISchedulerTask {
    name: string;
    cron: string;
    perform(): Promise<void>;
}
