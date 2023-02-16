import { HybridApplicationAdapter, MicroserviceStarter } from '@app/core/microservices';
import { WebsocketModule } from './websocket.module';

MicroserviceStarter.run({
    name: 'WEBSOCKET',
    applicationAdapter: new HybridApplicationAdapter(WebsocketModule),
});
