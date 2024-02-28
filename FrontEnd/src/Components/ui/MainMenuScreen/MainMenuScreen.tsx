import React, { useContext } from "react"
import { MainMenuStyled } from "./MainMenuStyled"
import { Link } from "react-router-dom"
import { Button, InverseButton } from "../../utils/Button/Button"
import { WebSocketContext } from "../../sockets/WebSocketProvider"

const MainMenuScreen: React.FC = () => {
    const { socket } = useContext(WebSocketContext);

    const handleCreateGame = () => {
        if (socket) {
            socket.emit('message', 'createRoom');
        }
    }
    return (
        <MainMenuStyled>
            <div>Welcome to Catfia</div>

            <Link to='/CreateGame'>
                <Button onClick={handleCreateGame}>Create game</Button>
            </Link>

            <Link to='/JoinGame'>
                <InverseButton>Join game</InverseButton>
            </Link>

            <div>Rules of the game:</div>
            <div>rules...</div>
        </MainMenuStyled>
    )
}

export default MainMenuScreen;