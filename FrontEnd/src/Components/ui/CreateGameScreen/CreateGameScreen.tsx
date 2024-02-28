import React, { useContext, useEffect, useState } from "react"
import { CreateGameStyled } from "./CreateGameStyled"
import { Button } from "../../utils/Button";
import { WebSocketContext } from "../../sockets/WebSocketProvider";

const CreateGameScreen: React.FC = () => {
    const { socket } = useContext(WebSocketContext);
    const [roomNum, setRoomNum] =  useState<number | null>(null)

    useEffect(() => {
        if(!socket) return;
    
        const handleRoomCode = (data: number) => {
            console.log("Received Data from server: ", data)
            setRoomNum(data);
        };
    
        const handleDisconnect = () => {
            console.log('User disconnected from room socket');
        };
    
        socket.on('room code', handleRoomCode);
        socket.on('disconnect', handleDisconnect);
    
        return () => {
            console.log('Cleaning up');
            socket.off('room code', handleRoomCode);
            socket.off('disconnect', handleDisconnect);
        };
    }, [socket]);

    const handleStartButon = () => {
        if (socket) {
            socket.emit('message', 'Starting Game');
        }
    }

    return (
        <CreateGameStyled>
            <div>Room Code:</div>
            <div>{roomNum}</div>
            <Button onClick={handleStartButon}>Start</Button>
        </CreateGameStyled>
    )
}

export default CreateGameScreen;