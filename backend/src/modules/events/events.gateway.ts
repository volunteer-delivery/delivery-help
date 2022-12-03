import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from 'socket.io';
import {Ride, RideComment} from "../prisma";

@WebSocketGateway({
    cors: {origin: '*'}
})
export class EventsGateway {
    @WebSocketServer()
    private server: Server;

    broadcastNewRide(ride: Ride): void {
        this.server.emit('rides/new', ride);
    }

    broadcastUpdateRide(userId: string | null, ride: Ride): void {
        const namespace = userId ? `users/${userId}/rides` : 'rides';
        this.server.emit(`${namespace}/update`, ride);
    }

    broadcastNewRideComment(rideId: string, comment: RideComment): void {
        this.server.emit(`rides/${rideId}/comments/new`, comment);
    }
}
