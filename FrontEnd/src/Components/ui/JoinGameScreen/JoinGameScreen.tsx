import React, { useContext, useState } from "react";
import { JoinGameStyled } from "./JoinGameStyled";
import { InputBox } from "../../utils/InputBox";
import { Button } from "../../utils/Button";
import { WebSocketContext } from "../../sockets/WebSocketProvider";

const JoinGameScreen: React.FC = () => {
    const { socket } = useContext(WebSocketContext);
    const [roomCode, setRoomCode] = useState<string>("");
    const [playerName, setPlayerName] = useState<string>("");

    const handleRoomCodeChange = (value: string) => {
        setRoomCode(value);
    };

    const handlePlayerNameChange = (value: string) => {
        setPlayerName(value);
    };

    const handleEnterButton = () => {
        if (socket) {
            socket.emit('message', 'joinRoom', roomCode, playerName );
        }
    }

    return(
        <JoinGameStyled>
            <div>Join A Room</div>
            <InputBox placeholder="Room Code" value={roomCode} onChange={handleRoomCodeChange}/>
            <InputBox placeholder="Name" value={playerName} onChange={handlePlayerNameChange}/>
            <Button onClick={handleEnterButton}>Enter</Button>
        </JoinGameStyled>

    )
}

export default JoinGameScreen;