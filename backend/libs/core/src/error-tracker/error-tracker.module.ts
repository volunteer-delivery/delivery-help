import { Global, Module } from '@nestjs/common';
import { ErrorTracker, IErrorTracker } from './error-tracker';
import { ErrorTrackerInterceptor } from './error-tracker.interceptor';

@Global()
@Module({
    providers: [
        { provide: ErrorTracker, useFactory: (): IErrorTracker => ErrorTracker.init() },
        ErrorTrackerInterceptor,
    ],
    exports: [
        ErrorTracker,
        ErrorTrackerInterceptor,
    ],
})
export class ErrorTrackerModule {}
