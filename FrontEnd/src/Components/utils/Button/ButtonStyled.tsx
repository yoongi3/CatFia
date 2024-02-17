import styled from "styled-components";

export const ButtonStyled = styled.button`
    background-color: black;
    color: white;

    &:hover {
        background-color: white;
        color: black;
    }
`;

export const InverseButtonStyled = styled.button`
    background-color: white;
    color: black;

    &:hover {
        background-color: black;
        color: white;
    }
`