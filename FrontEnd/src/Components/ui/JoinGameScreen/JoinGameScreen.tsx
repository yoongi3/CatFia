import React, { useContext, useEffect, useState } from "react";
import { JoinGameStyled } from "./JoinGameStyled";
import { InputBox } from "../../utils/InputBox";
import { Button } from "../../utils/Button";
import { WebSocketContext } from "../../sockets/WebSocketProvider";
import { useNavigate } from "react-router-dom";

const JoinGameScreen: React.FC = () => {
    const navigate = useNavigate();
    const { socket } = useContext(WebSocketContext);
    const [roomCode, setRoomCode] = useState<string>("");
    const [playerName, setPlayerName] = useState<string>("");

    useEffect(() => {
        if(!socket) return;

        const handleJoinRoom = (message: string) => {
            console.log(message, socket)
            navigate('/Lobby')
        }

        const handleErrorMessage = (message: string) => [
            console.log(message)
        ]

        socket.on('errorMessage', handleErrorMessage);
        socket.on('joinRoom', handleJoinRoom);

        return () => {
            socket.off('errorMessage', handleErrorMessage);
            socket.off('joinRoom', handleJoinRoom)
        }

    },[socket])

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
            <InputBox placeholder="Room Code" value={roomCode} maxLength={4} onChange={handleRoomCodeChange}/>
            <InputBox placeholder="Name" value={playerName} maxLength={12} onChange={handlePlayerNameChange}/>
            <Button onClick={handleEnterButton}>Enter</Button>
        </JoinGameStyled>

    )
}

export default JoinGameScreen;