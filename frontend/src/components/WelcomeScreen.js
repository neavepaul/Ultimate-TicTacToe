import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid"; // Used to generate unique room IDs

export default function WelcomeScreen({ onStart }) {
    const [player, setPlayer] = useState(null);
    const [roomId, setRoomId] = useState("");

    const handlePlayerSelect = (selectedPlayer) => {
        setPlayer(selectedPlayer);
    };

    const handleStartGame = () => {
        if (player) {
            const room = roomId || uuidv4(); // Generate a room ID if not provided
            onStart(player, room);
        }
    };

    return (
        <Container>
            <Title>Ultimate Tic-Tac-Toe</Title>
            <Copyright>Developed by YourName</Copyright>
            <PlayerSelect>
                <PlayerButton
                    onClick={() => handlePlayerSelect("X")}
                    selected={player === "X"}
                >
                    X
                </PlayerButton>
                <PlayerButton
                    onClick={() => handlePlayerSelect("O")}
                    selected={player === "O"}
                >
                    O
                </PlayerButton>
            </PlayerSelect>
            <RoomInput
                type="text"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <StartButton onClick={handleStartGame} disabled={!player}>
                Start Game
            </StartButton>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: "Helvetica", Futura, sans-serif;
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

const Copyright = styled.p`
    margin-bottom: 40px;
`;

const PlayerSelect = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const PlayerButton = styled.button`
    background: ${(props) => (props.selected ? "#007bff" : "#fff")};
    color: ${(props) => (props.selected ? "#fff" : "#007bff")};
    border: 2px solid #007bff;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
        color: #fff;
    }
`;

const RoomInput = styled.input`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #007bff;
    border-radius: 4px;
`;

const StartButton = styled.button`
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

    &:hover {
        background: #0056b3;
    }
`;
