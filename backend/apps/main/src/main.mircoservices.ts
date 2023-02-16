import { MicroservicesFactoryModule } from '@app/core/microservices';
import { BotMicroserviceApi } from '@app/bot-telegram/bot.microservice-api';
import { WebsocketMicroserviceApi } from '@app/websocket/websocket.microservice-api';

export const MicroservicesModule = MicroservicesFactoryModule.create({
    BOT_TELEGRAM: BotMicroserviceApi,
    WEBSOCKET: WebsocketMicroserviceApi,
});
