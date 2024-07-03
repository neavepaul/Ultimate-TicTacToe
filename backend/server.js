const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const gameState = {
    boards: new Array(9).fill(null),
    currPlayer: "X",
    winner: null,
    unlockedBoard: null,
};

io.on("connection", (socket) => {
    console.log("a user connected");

    // Send the current game state to the newly connected client
    socket.emit("gameState", gameState);

    socket.on("move", (data) => {
        if (gameState.currPlayer !== data.player) {
            return;
        }

        const { boardIndex, squares, squareIndex } = data;
        gameState.boards[boardIndex] = squares;
        gameState.currPlayer = gameState.currPlayer === "X" ? "O" : "X";
        gameState.winner = checkWinner(gameState.boards);
        gameState.unlockedBoard = gameState.boards[squareIndex]
            ? null
            : squareIndex;

        io.emit("gameState", gameState);
    });

    socket.on("resetGame", () => {
        gameState.boards = new Array(9).fill(null);
        gameState.currPlayer = "X";
        gameState.winner = null;
        gameState.unlockedBoard = null;

        io.emit("gameState", gameState);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

function checkWinner(boards) {
    const winPossibilities = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const [a, b, c] of winPossibilities) {
        if (
            (boards[a] === "X" || boards[a] === "O") &&
            boards[a] === boards[b] &&
            boards[a] === boards[c]
        )
            return boards[a];
    }
    if (boards.every((s) => s != null)) return "#";
    return null;
}

server.listen(4000, () => {
    console.log("listening on *:4000");
});
