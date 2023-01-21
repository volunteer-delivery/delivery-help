import {Controller, Inject} from '@nestjs/common';
import {EventPattern} from "@nestjs/microservices";
import {WebsocketGateway} from "./websocket.gateway";
import {ISendRequest} from "./types";
import {WebsocketMicroserviceEvent} from './websocket.microservice-api';

@Controller()
export class WebsocketController {
    @Inject()
    private gateway: WebsocketGateway

    @EventPattern(WebsocketMicroserviceEvent.SEND)
    public send({name, payload}: ISendRequest): void {
        this.gateway.send(name, payload);
    }
}
