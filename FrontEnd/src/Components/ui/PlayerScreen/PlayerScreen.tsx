import { useState } from "react";
import { JoinGameScreen } from "./JoinGameScreen"
import { LobbyScreen } from "./LobbyScreen";

const PlayerScreen: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState('JoinGame')

    const handleScreenToggle = (screen: string) => {
        setCurrentScreen(screen);
    };

    return(
        <div>
            {currentScreen === 'JoinGame' && <JoinGameScreen goToLobby={() => handleScreenToggle('Lobby')} />}
            {currentScreen === 'Lobby' && <LobbyScreen/>}
        </div>
    )
}

export default PlayerScreen;