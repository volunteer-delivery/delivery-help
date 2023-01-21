import {Inject, Injectable} from "@nestjs/common";
import {EventPattern} from "@nestjs/microservices";
import {BotConnection} from "./bot.connection";
import { BotMicroserviceEvent } from "./bot.microservice-api";
import {ISendMessageRequest} from "./types";

@Injectable()
export class BotController {
    @Inject()
    private botConnection: BotConnection;

    @EventPattern(BotMicroserviceEvent.SEND_MESSAGE)
    public sendMessage(event: ISendMessageRequest) {
        this.botConnection.sendMessage(event.chatId, event.message);
    }
}
