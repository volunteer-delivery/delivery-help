import {WebsocketModule} from './websocket.module';
import {HybridApplicationAdapter, MicroserviceStarter} from "@app/core/microservices";

MicroserviceStarter.run({
    name: 'WEBSOCKET',
    applicationAdapter: new HybridApplicationAdapter(WebsocketModule),
});
