import { InputBoxStyled } from "./InputBoxStyled";

type Props = {
    placeholder: string;
    value: string;
    maxLength: number;
    onChange: (value: string) => void;
}

export const InputBox = ({ placeholder, value, maxLength, onChange}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value.toUpperCase());
    };

    return(
        <InputBoxStyled 
            placeholder={placeholder} 
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
        />
    );
}