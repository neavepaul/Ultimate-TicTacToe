import React from "react";
import styled from "styled-components";

export default function Board({
  squares,
  currPlayer,
  onClick,
  blocked,
  winner,
}) {
  const renderSquare =
      (i) => {
        const isUnlockedAndUnmarked =
            (blocked === null || i === blocked) && !squares[i];

        return (
            <Square
                key={i}
                onClick={() => onClick(i)}
                value={squares[i]}
                disabled={blocked || squares[i]}
                currPlayer={currPlayer}
                unlocked={isUnlockedAndUnmarked}
                winner={winner}
            >
                {squares[i]}
            </Square>
        );
    };

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

  const BoardContainer = styled("div") `
    display: grid;
    grid-template-columns: repeat(3, 50px); /* Adjust size of each square */
    grid-template-rows: repeat(3, 50px); /* Adjust size of each square */
    gap: 2px; /* Gap between squares */
    margin: 10px; /* Margin around the board */
    border: 2px solid #333; /* Border around the entire board */
`;

  const Square = styled("button") `
    width: 100%; /* Ensure squares take up entire space */
    height: 100%; /* Ensure squares take up entire space */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background: ${
      (props) => props.value === "X"   ? "#007bff"
                 : props.value === "O" ? "#28a745"
                                       : "#fff"}; /* Custom color for X and O */
    color: ${
      (props) => props.value === "X" || props.value === "O"
                     ? "#fff"
                     : "#000"}; /* Text color */
    border: 2px solid transparent; /* Default border */
    outline: none;
    cursor: pointer;
    position: relative; /* Ensure relative positioning for overlay */

    &:disabled {
        background: #ccc; /* Background color for disabled squares */
    }

    &:hover {
        background: ${
      (props) => props.disabled ? "#ccc" : "#f0f0f0"}; /* Hover effect */
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid
            ${
      (props) =>
          (props.unlocked
               ? "#ffc107"
               : "transparent")}; /* Highlight unlocked and unmarked squares */
        pointer-events: none; /* Ensure clicks go through the overlay */
    }
`;

  const Winner = styled("div") `
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    color: #f00;
`;
