import React, { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import GameEndModal from "./GameEndModal";

export default function Game(props) {
    const [boards, setBoards] = useState(new Array(9).fill(null));
    const [currPlayer, setCurrPlayer] = useState("X");
    const [winner, setWinner] = useState(null);
    const [unlockedBoard, setUnlockedBoard] = useState(null);
    const [gameKey, setGameKey] = useState(0); // state for resetting boards

    function handleClickOnBoard(b, squares, s) {
        if (winner) return;

        const newBoards = boards.slice();
        newBoards[b] = checkWinner(squares);

        setBoards(newBoards);
        setCurrPlayer(currPlayer === "X" ? "O" : "X");
        setWinner(checkWinner(newBoards));
        setUnlockedBoard(newBoards[s] ? null : s);
    }

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

    function handlePlayAgain() {
        setBoards(new Array(9).fill(null));
        setCurrPlayer("X");
        setWinner(null);
        setUnlockedBoard(null);
        setGameKey(gameKey + 1); // Update gameKey to reset boards
    }

    function renderBoard(b) {
        return (
            <Board
                key={`${gameKey}-${b}`} // Use gameKey to force re-render
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
