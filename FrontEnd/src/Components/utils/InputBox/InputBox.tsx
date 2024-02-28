import { InputBoxStyled } from "./InputBoxStyled";

type Props = {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export const InputBox = ({ placeholder, value, onChange}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value.toUpperCase());
    };
    
    return(
        <InputBoxStyled 
            placeholder={placeholder} 
            value={value} 
            onChange={handleChange}
        />
    );
}