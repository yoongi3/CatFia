import { ReactNode, MouseEventHandler } from "react";
import { ButtonStyled, InverseButtonStyled } from "./ButtonStyled";

type ButtonProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: ButtonProps) => {
    return(
        <ButtonStyled onClick={onClick}>
            {children}
        </ButtonStyled>
    );
};

export const InverseButton = ({ children, onClick }: ButtonProps) => {
    return(
        <InverseButtonStyled onClick={onClick}>
            {children}
        </InverseButtonStyled>
    )
}