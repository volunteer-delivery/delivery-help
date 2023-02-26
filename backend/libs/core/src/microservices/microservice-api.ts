import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export type MicroserviceKey = 'WEBSOCKET' | 'BOT_TELEGRAM';

@Injectable()
export abstract class MicroserviceApi {
    protected client: ClientProxy;

    public setClient(client: ClientProxy): void {
        this.client = client;
    }

    protected async emit<P = unknown>(event: string, payload?: P): Promise<void> {
        await firstValueFrom(this.client.emit(event, payload || null));
    }
}
