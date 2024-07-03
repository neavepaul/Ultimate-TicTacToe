const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Allow requests from this origin
        methods: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 4000;

let games = {};

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("createGame", (roomId) => {
        games[roomId] = {
            boards: new Array(9).fill(null),
            currPlayer: "X",
            winner: null,
            unlockedBoard: null,
        };
        socket.join(roomId);
        socket.emit("gameState", games[roomId]);
    });

    socket.on("joinGame", (roomId) => {
        socket.join(roomId);
        if (games[roomId]) {
            socket.emit("gameState", games[roomId]);
        }
    });

    socket.on("move", (roomId, b, squares, s) => {
        const game = games[roomId];
        if (!game || game.winner) return;

        const newBoards = game.boards.slice();
        newBoards[b] = checkWinner(squares);

        game.currPlayer = game.currPlayer === "X" ? "O" : "X";
        game.winner = checkWinner(newBoards);
        game.unlockedBoard = newBoards[s] ? null : s;
        game.boards = newBoards;

        io.to(roomId).emit("gameState", game);
    });

    socket.on("playAgain", (roomId) => {
        if (games[roomId]) {
            games[roomId] = {
                boards: new Array(9).fill(null),
                currPlayer: "X",
                winner: null,
                unlockedBoard: null,
            };
            io.to(roomId).emit("gameState", games[roomId]);
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function checkWinner(squares) {
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
            (squares[a] === "X" || squares[a] === "O") &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        )
            return squares[a];
    }
    if (squares.every((s) => s != null)) return "#";
    return null;
}
