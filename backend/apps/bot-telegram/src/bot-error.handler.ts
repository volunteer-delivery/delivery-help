import { Context } from 'telegraf';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ErrorTracker } from '@app/core/error-tracker';
import { IHandleBotError } from './bot.connection';

@Injectable()
export class BotErrorHandler implements IHandleBotError {
    private logger = new Logger(this.constructor.name);

    @Inject()
    private errorTracker: ErrorTracker;

    public catch(error: Error, { state }: Context): void {
        state.driver && this.errorTracker.setDriver(state.driver);
        this.errorTracker.sendError(error);
        this.logger.error(error.message, error.stack);
    }
}
