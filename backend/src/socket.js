const { Server } = require("socket.io");

let socketServer;

function initializeSocketServer(httpServer) {
    socketServer = new Server(httpServer, {
        cors: { origin: '*' }
    });
}

function broadcastNewRide(ride) {
    socketServer?.emit("newRide", ride);
}

function broadcastUpdateRide(ride) {
    socketServer?.emit("updateRide", ride);
}

function broadcastNewRideComment(rideId, comment) {
    socketServer?.emit(`newRideComment:${rideId}`, comment);
}

module.exports = {
    initializeSocketServer,
    broadcastNewRide,
    broadcastUpdateRide,
    broadcastNewRideComment
};
