const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

io.on("connection", (socket) => {
    console.log("New client connected");

    // Example: Handle joining a room
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Example: Handle making a move
    socket.on("makeMove", (roomId, moveData) => {
        // Validate move and update game state
        // Emit events to update clients in the room
    });

    // Disconnect handling
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        // Clean up logic if needed
    });
});
