import React from "react";
import styled from "styled-components";

export default function Board({
    squares,
    currPlayer,
    onClick,
    blocked,
    winner,
}) {
    const renderSquare = (i) => (
        <Square
            key={i}
            onClick={() => onClick(i)}
            value={squares[i]}
            disabled={blocked || squares[i]}
        >
            {squares[i]}
        </Square>
    );

    if (winner) {
        return (
            <BoardContainer>
                <Winner>{winner}</Winner>
            </BoardContainer>
        );
    }

    return (
        <BoardContainer>
            {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
        </BoardContainer>
    );
}

const BoardContainer = styled("div")`
    display: flex;
    flex-wrap: wrap;
    width: 150px;
    height: 150px;
`;

const Square = styled("button")`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
`;

const Winner = styled("div")`
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    color: #f00;
`;
