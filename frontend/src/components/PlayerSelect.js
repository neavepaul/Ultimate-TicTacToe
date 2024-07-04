import React, {useState} from "react";
import io from "socket.io-client";
import styled from "styled-components";

const socket = io("http://localhost:4000");

export default function PlayerSelect({onPlayerSelect}) {
  const [mode, setMode] = useState(null);
  const [roomID, setRoomID] = useState("");
  const [generatedRoomID, setGeneratedRoomID] = useState("");
  const [role, setRole] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState("");

  const handleCreateRoom = () => {
    const newRoomID = generateRoomID();
    setGeneratedRoomID(newRoomID);
    socket.emit("createRoom", newRoomID);
    setMode("create");
  };

  const handleJoinRoom = () => {
    socket.emit("joinRoom", roomID);
    socket.on(
        "roleAssignment",
        ({role}) => { onPlayerSelect({roomID, player : role, playerName}); });
  };

  const handleSelectRole = (player) => {
    setRole(player);
    socket.emit("selectRole", {roomID : generatedRoomID, player});
    onPlayerSelect({roomID : generatedRoomID, player, playerName});
  };

  const generateRoomID = () => {
    return Math.random().toString(36).substring(7); // Generate a random room ID
  };

    return (
        <Container>
            <Title>Ultimate Tic-Tac-Toe</Title>
            <p>Developed by Neave</p>
            {!mode && (
                <div>
                    <Button onClick={handleCreateRoom}>Create Room</Button>
                    <Button onClick={() => setMode("join")}>Join Room</Button>
                </div>
            )}
            {mode === "create" && (
                <div>
                    <p>
                        Room ID: <strong>{generatedRoomID}</strong> (copy this
                        to share with your opponent)
                    </p>
                    <Input
                        type="text"
                        placeholder="Your Name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                    <div>
                        <Button onClick={() => handleSelectRole("X")}>
                            Play as X
                        </Button>
                        <Button onClick={() => handleSelectRole("O")}>
                            Play as O
                        </Button>
                    </div>
                </div>
            )}
            {mode === "join" && (
                <div>
                    <Input
    type = "text"
    placeholder = "Enter Room ID"
                        value={roomID}
                        onChange={
    (e) => setRoomID(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Your Name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                    <Button onClick={handleJoinRoom}>Join Room</Button>
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    text-align: center;
`;

const Input = styled.input`
    margin-top: 10px;
    padding: 5px;
    width: 200px;
`;

const Button = styled.button`
    margin-top: 10px;
    margin-right: 10px;
`;
