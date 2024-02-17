import React from "react";
import { JoinGameStyled } from "./JoinGameStyled";
import { InputBox } from "../../utils/InputBox";
import { Button } from "../../utils/Button";

const JoinGameScreen: React.FC = () => {
    return(
        <JoinGameStyled>
            <div>Join A Room</div>
            <InputBox placeholder="Room Code"/>
            <InputBox placeholder="Name"/>
            <Button>Enter</Button>
        </JoinGameStyled>

    )
}

export default JoinGameScreen;