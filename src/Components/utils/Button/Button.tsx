import { ReactNode, MouseEventHandler } from "react";
import { ButtonStyled, InverseButtonStyled } from "./ButtonStyled";

type Props = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: Props) => {
    return(
        <ButtonStyled onClick={onClick}>
            {children}
        </ButtonStyled>
    );
};

export const InverseButton = ({ children, onClick }: Props) => {
    return(
        <InverseButtonStyled onClick={onClick}>
            {children}
        </InverseButtonStyled>
    )
}