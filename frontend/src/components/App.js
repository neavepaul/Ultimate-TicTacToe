import React, { useState } from "react";
import styled from "styled-components";

import Game from "./Game";
import WelcomeScreen from "./WelcomeScreen";

export default function App(props) {
    const [player, setPlayer] = useState(null);

    const handleStartGame = (selectedPlayer) => {
        setPlayer(selectedPlayer);
    };
    return (
        <Container>
            {player ? (
                <Game player={player} />
            ) : (
                <WelcomeScreen onStart={handleStartGame} />
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
