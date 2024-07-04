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

const rooms = {}; // Track rooms and player roles

const gameState = {
    boards: Array(9)
        .fill(null)
        .map(() => Array(9).fill(null)), // Nested arrays to represent squares within each board
    boardWinners: Array(9).fill(null), // Track the winner of each mini-board
    currPlayer: "X",
    overallWinner: null,
    unlockedBoard: null,
};

io.on("connection", (socket) => {
    console.log("a user connected");

    // Send the current game state to the newly connected client
    socket.emit("gameState", gameState);

    socket.on("createRoom", (roomID) => {
        rooms[roomID] = { X: null, O: null };
        socket.join(roomID);
    });

    socket.on("joinRoom", (roomID) => {
        if (rooms[roomID]) {
            const availableRole = Object.keys(rooms[roomID]).find(
                (key) => rooms[roomID][key] === null
            );
            console.log(`Player ${availableRole} joined room ${roomID}`);
            rooms[roomID][availableRole] = socket.id;
            socket.emit("roleAssignment", { role: availableRole });
            socket.join(roomID);
        }
    });

    socket.on("selectRole", ({ roomID, player }) => {
        if (rooms[roomID]) {
            rooms[roomID][player] = socket.id;
        }
    });

    socket.on("move", (data) => {
        if (gameState.currPlayer !== data.player || gameState.overallWinner) {
            return;
        }

        const { boardIndex, squareIndex } = data;

        if (
            !gameState.boards[boardIndex][squareIndex] &&
            !gameState.boardWinners[boardIndex]
        ) {
            gameState.boards[boardIndex][squareIndex] = data.player;
            gameState.currPlayer = gameState.currPlayer === "X" ? "O" : "X";
            gameState.boardWinners[boardIndex] = checkMiniBoardWinner(
                gameState.boards[boardIndex]
            );

            if (gameState.boardWinners[boardIndex]) {
                gameState.overallWinner = checkOverallWinner(
                    gameState.boardWinners
                );
            }

            // Check if the target board is won or full
            if (
                gameState.boards[squareIndex].every((sq) => sq !== null) ||
                gameState.boardWinners[squareIndex]
            ) {
                gameState.unlockedBoard = null;
            } else {
                gameState.unlockedBoard = squareIndex;
            }

            io.emit("gameState", gameState);
        }
    });

    socket.on("resetGame", () => {
        gameState.boards = Array(9)
            .fill(null)
            .map(() => Array(9).fill(null));
        gameState.boardWinners = Array(9).fill(null);
        gameState.currPlayer = "X";
        gameState.overallWinner = null;
        gameState.unlockedBoard = null;

        io.emit("gameState", gameState);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
        // Add logic to handle user disconnection and update room state if necessary
    });
});

function checkMiniBoardWinner(board) {
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
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

function checkOverallWinner(boardWinners) {
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
            boardWinners[a] &&
            boardWinners[a] === boardWinners[b] &&
            boardWinners[a] === boardWinners[c]
        ) {
            return boardWinners[a];
        }
    }

    return null;
}

server.listen(4000, () => {
    console.log("listening on *:4000");
});
