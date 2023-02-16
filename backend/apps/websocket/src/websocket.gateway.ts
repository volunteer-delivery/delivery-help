import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({
    transports: ['websocket'],
    path: '/websocket',
    cors: {
        origin: process.env.FRONTEND_ORIGIN,
        credentials: true,
    },
})
export class WebsocketGateway {
    @WebSocketServer()
    private server: Server;

    public send(event: string, payload: unknown): void {
        this.server.emit(event, payload);
    }
}
