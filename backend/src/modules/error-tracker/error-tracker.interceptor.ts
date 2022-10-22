import {CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor} from "@nestjs/common";
import {catchError, Observable, throwError} from "rxjs";
import {NextFunction, Request, Response} from "express";
import {ErrorTracker} from "./error-tracker";
import {ISignedRequest} from "../auth";

@Injectable()
export class ErrorTrackerInterceptor implements NestInterceptor {
    @Inject()
    private errorTracker: ErrorTracker;

    intercept(host: ExecutionContext, next: CallHandler): Observable<any> {
        const context = host.switchToHttp();
        const request = context.getRequest<ISignedRequest>();
        const response = context.getResponse<Response>();
        const nextFnStub: NextFunction = () => {};

        this.useRequestHandler(request, response, nextFnStub);

        return next.handle().pipe(catchError((error): Observable<never> => {
            this.useErrorHandler(error, request, response, nextFnStub);
            return throwError(error);
        }));
    }

    private useRequestHandler(request: ISignedRequest, response: Response, next: NextFunction): void {
        request.user && this.errorTracker.setVolunteer(request.user);
        this.errorTracker.express.requestHandler(request as Request, response, next);
    }

    private useErrorHandler(error: Error, request: Request, response: Response, next: NextFunction): void {
        this.errorTracker.express.errorHandler(error, request, response, next);
    }
}
