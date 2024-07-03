import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import Board from "./Board";
import GameEndModal from "./GameEndModal";

const socket = io("http://localhost:4000");

export default function Game({ player }) {
    const [gameState, setGameState] = useState({
        boards: new Array(9).fill(null),
        currPlayer: "X",
        winner: null,
        unlockedBoard: null,
    });

    useEffect(() => {
        socket.on("gameState", (state) => {
            setGameState(state);
        });

        return () => {
            socket.off("gameState");
        };
    }, []);

    const handleClickOnBoard = (boardIndex, squares, squareIndex) => {
        if (gameState.winner || gameState.currPlayer !== player) return;

        socket.emit("move", { player, boardIndex, squares, squareIndex });
    };

    const handlePlayAgain = () => {
        socket.emit("resetGame");
    };

    const renderBoard = (b) => (
        <Board
            key={b}
            currPlayer={gameState.currPlayer}
            onClick={(squares, s) => handleClickOnBoard(b, squares, s)}
            winner={gameState.boards[b]}
            blocked={
                b !== gameState.unlockedBoard &&
                gameState.unlockedBoard !== null
            }
        />
    );

    return (
        <>
            <Label>
                {gameState.winner
                    ? `${gameState.winner} won!`
                    : `${gameState.currPlayer}'s turn`}
            </Label>
            <Container>
                <Row>{[0, 1, 2].map((b) => renderBoard(b))}</Row>
                <Row>{[3, 4, 5].map((b) => renderBoard(b))}</Row>
                <Row>{[6, 7, 8].map((b) => renderBoard(b))}</Row>
            </Container>
            <GameEndModal
                show={!!gameState.winner}
                winner={gameState.winner}
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
