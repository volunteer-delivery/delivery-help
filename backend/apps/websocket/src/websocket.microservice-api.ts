import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { MicroserviceApi } from '@app/core/microservices';
import { ISendRequest } from './types';

export enum WebsocketMicroserviceEvent {
    SEND = 'send',
}

@Injectable()
export class WebsocketMicroserviceApi extends MicroserviceApi {
    public async broadcast(event: string, payload: unknown): Promise<void> {
        await this.emit<ISendRequest>(WebsocketMicroserviceEvent.SEND, {
            name: event,
            payload: instanceToPlain(payload),
        });
    }
}
