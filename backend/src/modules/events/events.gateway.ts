import {Server} from 'socket.io';
import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {instanceToPlain} from "class-transformer";

@WebSocketGateway({
    cors: {origin: '*'}
})
export class EventsGateway {
    @WebSocketServer()
    private server: Server;

    send(event: string, payload: any): void {
        this.server.emit(event, instanceToPlain(payload));
    }
}
