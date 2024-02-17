import React from "react"
import { MainMenuStyled } from "./MainMenuStyled"
import { Link } from "react-router-dom"
import { Button, InverseButton } from "../../utils/Button/Button"

const MainMenuScreen: React.FC = () => {
    return (
        <MainMenuStyled>
            <div>Welcome to Catfia</div>

            <Link to='/CreateGame'>
                <Button>Create game</Button>
            </Link>

            <Link to='/JoinGame'>
                <InverseButton>Join game</InverseButton>
            </Link>

            <div>Rules of the game:</div>
            <div>rules...</div>
        </MainMenuStyled>
    )
}

export default MainMenuScreen;