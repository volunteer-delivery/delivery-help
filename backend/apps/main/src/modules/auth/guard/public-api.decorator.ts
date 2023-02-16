import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export const PublicApi = (): CustomDecorator<symbol> => SetMetadata(AuthGuard.PUBLIC_API_METADATA, true);
