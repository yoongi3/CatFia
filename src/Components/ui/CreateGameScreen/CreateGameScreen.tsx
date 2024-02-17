import React from "react"
import { CreateGameStyled } from "./CreateGameStyled"

const CreateGameScreen: React.FC = () => {
    return (
        <CreateGameStyled>
            <div>Room Code:</div>
            <div>TDI9</div>
            <button>Start</button>
        </CreateGameStyled>
    )
}

export default CreateGameScreen;