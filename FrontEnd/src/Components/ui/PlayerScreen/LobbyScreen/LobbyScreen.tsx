import { useContext, useEffect, useState } from "react";
import { LobbyScreenStyled } from "./LobbyScreenStyled"
import { WebSocketContext } from "../../../sockets/WebSocketProvider";

const LobbyScreen: React.FC = () => {
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
        <LobbyScreenStyled>
            <div>
                {!name ? (
                    // add a reusable disconnected screen
                    <div>Disconnected</div>
                ) : (
                    <div>
                        <div>Welcome</div>
                        <div>{name}</div>
                        <div>Waiting for host to start game</div>
                    </div>
                )}
            </div>
        </LobbyScreenStyled>
    )
}

export default LobbyScreen;