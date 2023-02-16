import { MicroservicesFactoryModule } from '@app/core/microservices';
import { WebsocketMicroserviceApi } from '@app/websocket/websocket.microservice-api';

export const MicroservicesModule = MicroservicesFactoryModule.create({
    WEBSOCKET: WebsocketMicroserviceApi,
});
