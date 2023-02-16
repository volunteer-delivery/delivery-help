import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@app/core/environment';
import { WebsocketController } from './websocket.controller';
import { WebsocketGateway } from './websocket.gateway';

@Module({
    imports: [EnvironmentModule],
    controllers: [WebsocketController],
    providers: [WebsocketGateway],
})
export class WebsocketModule {}
