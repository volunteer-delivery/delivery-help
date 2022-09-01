const { Server } = require("socket.io");

let socketServer;

function initializeSocketServer(httpServer) {
    socketServer = new Server(httpServer, {
        cors: { origin: '*' }
    });
}

function broadcastNewRide(ride) {
    socketServer.emit('rides/new', ride);
}

function broadcastUpdateRide(userId, ride) {
    const namespace = userId ? `users/${userId}/rides` : 'rides';
    socketServer.emit(`${namespace}/update`, ride);
}

function broadcastNewRideComment(rideId, comment) {
    socketServer.emit(`rides/${rideId}/comments/new`, comment);
}

module.exports = {
    initializeSocketServer,
    broadcastNewRide,
    broadcastUpdateRide,
    broadcastNewRideComment
};
