import React, { useContext, useEffect, useState } from "react"
import { CreateGameStyled } from "./CreateGameStyled"
import { Button } from "../../utils/Button";
import { WebSocketContext } from "../../sockets/WebSocketProvider";

const CreateGameScreen: React.FC = () => {
    const { socket } = useContext(WebSocketContext);
    const [randomNumber, setRandomNumber] =  useState<number | null>(null)

    useEffect(() => {
        if(!socket) return;

        socket.on('randomNumber', (data: number) => {
            console.log("Received Data from server: ", data)

            setRandomNumber(data);
        });

        return () => {
            socket.off('randomNumber');
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
            <div>{randomNumber}</div>
            <Button onClick={handleStartButon}>Start</Button>
        </CreateGameStyled>
    )
}

export default CreateGameScreen;