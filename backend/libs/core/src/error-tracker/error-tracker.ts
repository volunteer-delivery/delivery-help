import Bugsnag, { Client } from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { Driver, User } from '@app/prisma';

interface BugsnagPluginExpress {
    requestHandler: RequestHandler;
    errorHandler: ErrorRequestHandler;
}

export interface IErrorTracker {
    express: BugsnagPluginExpress;
    setVolunteer(user: User): void;
    setDriver(driver: Driver): void;
    sendError(error: Error): void;
}

class ErrorTrackerStub implements IErrorTracker {
    public express = {
        errorHandler: (): void => {},
        requestHandler: (): void => {},
    };

    public setVolunteer = (): void => {};
    public setDriver = (): void => {};
    public sendError = (): void => {};
}

enum UserRole {
    VOLUNTEER = 'volunteer',
    DRIVER = 'driver',
}

export class ErrorTracker implements IErrorTracker {
    public static instance: IErrorTracker;

    public static init(): IErrorTracker {
        if (this.instance) return this.instance;

        const { BACKEND_BUGSNAG_KEY, BACKEND_ENV } = process.env;

        if (!BACKEND_BUGSNAG_KEY) {
            this.instance = new ErrorTrackerStub();
            return this.instance;
        }

        Bugsnag.start({
            apiKey: BACKEND_BUGSNAG_KEY,
            releaseStage: BACKEND_ENV,
            plugins: [BugsnagPluginExpress],
        });

        this.instance = new ErrorTracker(Bugsnag);
    }

    public readonly express: BugsnagPluginExpress = this.client.getPlugin('express');

    constructor(private readonly client: Client) {}

    public setVolunteer(user: User): void {
        this.setUser(user.id, user.name, UserRole.VOLUNTEER);
    }

    public setDriver(driver: Driver): void {
        this.setUser(driver.id, driver.name, UserRole.DRIVER);
    }

    private setUser(id: string, name: string, role: UserRole): void {
        this.client.setUser(id, null, name);
        this.client.addMetadata('user', 'role', role);
    }

    public sendError(error: Error): void {
        this.client.notify(error);
    }
}
