import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Board from "./Board";
import GameEndModal from "./GameEndModal";

const socket = io("http://localhost:4000"); // Update with your server address

export default function Game(props) {
    const [boards, setBoards] = useState(new Array(9).fill(null));
    const [currPlayer, setCurrPlayer] = useState("X");
    const [winner, setWinner] = useState(null);
    const [unlockedBoard, setUnlockedBoard] = useState(null);

    useEffect(() => {
        const roomId = "room1"; // Example room ID
        socket.emit("createGame", roomId);

        socket.on("gameState", (game) => {
            setBoards(game.boards);
            setCurrPlayer(game.currPlayer);
            setWinner(game.winner);
            setUnlockedBoard(game.unlockedBoard);
        });

        return () => {
            socket.off("gameState");
        };
    }, []);

    function handleClickOnBoard(b, squares, s) {
        if (winner) return;
        const roomId = "room1"; // Example room ID
        socket.emit("move", roomId, b, squares, s);
    }

    function handlePlayAgain() {
        const roomId = "room1"; // Example room ID
        socket.emit("playAgain", roomId);
    }

    function renderBoard(b) {
        return (
            <Board
                key={b}
                currPlayer={currPlayer}
                onClick={(squares, s) => handleClickOnBoard(b, squares, s)}
                winner={boards[b]}
                blocked={b !== unlockedBoard && unlockedBoard !== null}
            />
        );
    }

    return (
        <>
            <Label>{winner ? `${winner} won!` : `${currPlayer}'s turn`}</Label>
            <Container>
                <Row>{[0, 1, 2].map((b) => renderBoard(b))}</Row>
                <Row>{[3, 4, 5].map((b) => renderBoard(b))}</Row>
                <Row>{[6, 7, 8].map((b) => renderBoard(b))}</Row>
            </Container>
            <GameEndModal
                show={!!winner}
                winner={winner}
                onPlayAgain={handlePlayAgain}
            />
        </>
    );
}

const Label = styled("h1")`
    text-align: center;
`;
const Container = styled("div")``;
const Row = styled("div")`
    display: flex;
`;
