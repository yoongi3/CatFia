import { useContext, useEffect, useState } from "react";
import { PLayerScreenStyled } from "./PlayerScreenStyled"
import { WebSocketContext } from "../../sockets/WebSocketProvider";

const PlayerScreen: React.FC = () => {
    const { socket } = useContext(WebSocketContext);
    const [name, setName] = useState("");

    const getName = () => {
        if (socket) {
            socket.emit('message', 'getName');
        }
    }

    useEffect(() => {
        if (!socket) return;

        const handleName = (playerName: string) => {
            setName(playerName);
        };

        getName();
        console.log('request sent')

        socket.on('name', handleName);

        return () => {
            socket.off('name', handleName);
        };
    }, [socket])
    return(
        <PLayerScreenStyled>
            <div>nihao</div>
            <div>{name}</div>
        </PLayerScreenStyled>
    )
}

export default PlayerScreen;