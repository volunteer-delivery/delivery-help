import {Module} from '@nestjs/common';
import {WebsocketController} from './websocket.controller';
import {EnvironmentModule} from "@app/core/environment";
import {WebsocketGateway} from "./websocket.gateway";

@Module({
    imports: [EnvironmentModule],
    controllers: [WebsocketController],
    providers: [WebsocketGateway]
})
export class WebsocketModule {}
