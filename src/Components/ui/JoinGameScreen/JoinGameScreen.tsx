import React from "react";
import { JoinGameStyled } from "./JoinGameStyled";

const JoinGameScreen: React.FC = () => {
    return(
        <JoinGameStyled>
            <div>Join A Room</div>
            <input></input>
            <input></input>
            <button>Enter</button>
        </JoinGameStyled>

    )
}

export default JoinGameScreen;