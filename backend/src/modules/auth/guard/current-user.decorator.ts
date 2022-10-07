import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {Response} from "express";

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Response>().req.user;
});
