import React, { useState } from "react";
import styled from "styled-components";
import PlayerSelect from "./PlayerSelect";
import Game from "./Game";

export default function App() {
    const [player, setPlayer] = useState(null);

    const handleSelectPlayer = (selectedPlayer) => {
        setPlayer(selectedPlayer);
    };

    return (
        <Container>
            {player ? (
                <Game player={player} />
            ) : (
                <PlayerSelect onSelectPlayer={handleSelectPlayer} />
            )}
        </Container>
    );
}

const Container = styled("div")`
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: "Helvetica", Futura, sans-serif;
    --square-size: 65px; /* FIXME: qualquer mudança requer mudanças nas fontes dos botoes */
`;
