import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {ISignedRequest} from '@app/core/types';

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<ISignedRequest>().user
});
