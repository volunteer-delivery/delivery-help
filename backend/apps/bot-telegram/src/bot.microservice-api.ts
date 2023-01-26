import {MicroserviceApi} from "@app/core/microservices";
import {Injectable} from "@nestjs/common";
import {ISendMessageRequest} from "@app/bot-telegram/types";

export enum BotMicroserviceEvent {
    SEND_MESSAGE = 'send-message',
}

@Injectable()
export class BotMicroserviceApi extends MicroserviceApi {
    public async sendMessage(chatId: string, message: string): Promise<void> {
        await this.emit<ISendMessageRequest>(BotMicroserviceEvent.SEND_MESSAGE, {chatId, message});
    }
}
