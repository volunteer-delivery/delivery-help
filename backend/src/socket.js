const { Server } = require("socket.io");

let socketServer;

function initializeSocketServer(httpServer) {
    socketServer = new Server(httpServer, {
        cors: { origin: '*' }
    });
}

function broadcastNewRide(ride) {
    if (socketServer) {
        socketServer.emit("newRide", ride);
    }
}

function broadcastUpdateRide(ride) {
    if (socketServer) {
        socketServer.emit("updateRide", ride);
    }
}

module.exports = { initializeSocketServer, broadcastNewRide, broadcastUpdateRide };
