import React from "react";
import styled from "styled-components";

export default function GameEndModal({show, winner, onPlayAgain}) {
  if (!show)
    return null;

  return (
      <Overlay><ModalContainer><Message>{winner} won!
      </Message>
                <PlayAgainButton onClick={onPlayAgain}>
                    Play Again
                </PlayAgainButton>
      </ModalContainer>
        </Overlay>);
}

const Overlay = styled("div") `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled("div") `
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Message = styled("h2") `
    margin-bottom: 20px;
`;

const PlayAgainButton = styled("button") `
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background: #0056b3;
    }
`;
