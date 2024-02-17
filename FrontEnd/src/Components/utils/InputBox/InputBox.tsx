import { InputBoxStyled } from "./InputBoxStyled";

type Props = {
    placeholder: string;
}

export const InputBox = ({ placeholder}: Props) => {
    return(
    <InputBoxStyled placeholder={placeholder} />
    )
}