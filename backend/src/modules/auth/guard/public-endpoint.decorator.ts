import {SetMetadata} from "@nestjs/common";
import {AuthGuard} from "./auth.guard";

export const PublicEndpoint = () => SetMetadata(AuthGuard.PUBLIC_ENDPOINT_METADATA, true);
