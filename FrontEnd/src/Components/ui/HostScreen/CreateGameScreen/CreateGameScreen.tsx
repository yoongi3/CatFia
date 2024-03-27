import React, { useContext, useEffect, useState } from "react"
import { CreateGameStyled } from "./CreateGameStyled"
import { Button } from "../../../utils/Button";
import { WebSocketContext } from "../../../sockets/WebSocketProvider";

const CreateGameScreen: React.FC = () => {
    const { socket } = useContext(WebSocketContext);
    const [roomNum, setRoomNum] =  useState<number | null>(null)
    const [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        if(!socket) return;
    
        const handleRoomCode = (data: number) => {
            console.log("Received Data from server: ", data)
            setRoomNum(data);
        };
    
        const handleDisconnect = () => {
            console.log('User disconnected from room socket');
        };

        const handleNewPlayer = (player: string) => {
            setPlayers(prevPlayers => [...prevPlayers, player]);
            console.log(player)
        };

        const handlePlayerLeft = (player: string) => {
            setPlayers(prevPlayers => prevPlayers.filter(player => player !== player));
            console.log(player, 'left')
        }
    
        socket.on('room code', handleRoomCode);
        socket.on('playerJoined', handleNewPlayer);
        socket.on('playerLeft', handlePlayerLeft);
        socket.on('disconnect', handleDisconnect);
    
        return () => {
            socket.off('room code', handleRoomCode);
            socket.off('playerJoined', handleNewPlayer);
            socket.off('playerLeft', handlePlayerLeft);
            socket.off('disconnect', handleDisconnect);
        };
    }, [socket]);

    const handleStartButton = () => {
        if (socket) {
            socket.emit('message', 'Starting Game');
        }
    }

    return (
        <CreateGameStyled>
            <div>Room Code:</div>
            <div>{roomNum}</div>
            <Button onClick={handleStartButton}>Start</Button>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player}</li>
                ))}
            </ul>
        </CreateGameStyled>
    )
}

export default CreateGameScreen;