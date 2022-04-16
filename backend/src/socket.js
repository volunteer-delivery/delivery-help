const { Server } = require("socket.io");

let socketServer;

function initializeSocketServer(httpServer) {
    socketServer = new Server(httpServer);  
}

function broadcastNewRide(ride) {
    if (socketServer) {
        socketServer.emit("newRide", ride);
    }
}

module.exports = { initializeSocketServer, broadcastNewRide };
