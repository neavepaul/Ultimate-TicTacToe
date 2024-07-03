import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";

import Board from "./Board";
import GameEndModal from "./GameEndModal";

const socket = io("http://localhost:4000");

export default function Game({ player }) {
  const [gameState, setGameState] = useState({
    boards: Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
    boardWinners: Array(9).fill(null),
    currPlayer: "X",
    overallWinner: null,
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

  const handleClickOnSquare = (boardIndex, squareIndex) => {
    if (gameState.overallWinner || gameState.currPlayer !== player) return;

    if (
      gameState.unlockedBoard === null ||
      gameState.unlockedBoard === boardIndex
    ) {
      socket.emit("move", { player, boardIndex, squareIndex });
    }
  };

  const handlePlayAgain = () => {
    socket.emit("resetGame");
  };

  const renderBoard = (b) => (
    <Board
      key={b}
      currPlayer={gameState.currPlayer}
      onClick={(s) => handleClickOnSquare(b, s)}
      squares={gameState.boards[b]}
      blocked={
        (b !== gameState.unlockedBoard && gameState.unlockedBoard !== null) ||
        gameState.boardWinners[b]
      }
      winner={gameState.boardWinners[b]}
    />
  );

  return (
    <>
      <Label>
        {gameState.overallWinner
          ? `${gameState.overallWinner} won the game!`
          : `${gameState.currPlayer}'s turn`}
      </Label>
      <Container>
        <Row>{[0, 1, 2].map((b) => renderBoard(b))} </Row>
        <Row>{[3, 4, 5].map((b) => renderBoard(b))}</Row>
        <Row>{[6, 7, 8].map((b) => renderBoard(b))} </Row>
      </Container>{" "}
      <GameEndModal
        show={!!gameState.overallWinner}
        winner={gameState.overallWinner}
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
