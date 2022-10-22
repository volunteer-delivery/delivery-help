import Bugsnag, { Client } from "@bugsnag/js";
import BugsnagPluginExpress from "@bugsnag/plugin-express";
import {ErrorRequestHandler, RequestHandler} from "express";
import {IDriverModel, IUserModel} from "../database";

interface BugsnagPluginExpress {
    requestHandler: RequestHandler;
    errorHandler: ErrorRequestHandler;
}

interface IErrorTracker {
    express: BugsnagPluginExpress;
}

class ErrorTrackerStub implements IErrorTracker {
    express = {
        errorHandler: () => {},
        requestHandler: () => {}
    }
}

enum UserRole {
    VOLUNTEER = 'volunteer',
    DRIVER = 'driver'
}

export class ErrorTracker implements IErrorTracker {
    static instance: IErrorTracker;

    static init(): IErrorTracker {
        if (this.instance) return this.instance;

        const { BACKEND_BUGSNAG_KEY, BACKEND_ENV } = process.env;

        if (!BACKEND_BUGSNAG_KEY) {
            this.instance = new ErrorTrackerStub();
            return this.instance;
        }

        Bugsnag.start({
            apiKey: BACKEND_BUGSNAG_KEY,
            releaseStage: BACKEND_ENV,
            plugins: [BugsnagPluginExpress]
        });

        this.instance = new ErrorTracker(Bugsnag);
    }

    static get express(): BugsnagPluginExpress {
        return this.instance.express;
    }

    readonly express: BugsnagPluginExpress = this.client.getPlugin('express');

    constructor(private readonly client: Client) {}

    setVolunteer(user: IUserModel): void {
        this.setUser(user.id, user.name, UserRole.VOLUNTEER);
    }

    setDriver(driver: IDriverModel): void {
        this.setUser(driver.id, driver.name, UserRole.DRIVER);
    }

    private setUser(id: string, name: string, role: UserRole): void {
        this.client.setUser(id, null, name);
        this.client.addMetadata('user', 'role', role);
    }

    sendError(error: Error): void {
        this.client.notify(error);
    }
}
