import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from 'socket.io';
import {IRideCommentModel, IRideModel} from "../database";

@WebSocketGateway({
    cors: {origin: '*'}
})
export class EventsGateway {
    @WebSocketServer()
    private server: Server;

    broadcastNewRide(ride: IRideModel): void {
        this.server.emit('rides/new', ride);
    }

    broadcastUpdateRide(userId: string | null, ride: IRideModel): void {
        const namespace = userId ? `users/${userId}/rides` : 'rides';
        this.server.emit(`${namespace}/update`, ride);
    }

    broadcastNewRideComment(rideId: string, comment: IRideCommentModel): void {
        this.server.emit(`rides/${rideId}/comments/new`, comment);
    }
}
