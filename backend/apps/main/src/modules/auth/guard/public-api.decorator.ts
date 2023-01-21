import {SetMetadata} from "@nestjs/common";
import {AuthGuard} from "./auth.guard";

export const PublicApi = () => SetMetadata(AuthGuard.PUBLIC_API_METADATA, true);
