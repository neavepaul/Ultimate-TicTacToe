import React from "react";
import styled from "styled-components";

export default function Board({ squares, currPlayer, onClick, blocked }) {
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
