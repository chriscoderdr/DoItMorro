import { TextInputProps } from "react-native";

export interface IInputTextAreaFieldProps extends TextInputProps {
    label?: string;
    fullWidth?: boolean;
    placeholder?: string;
    errorText?: string;
    errorTestId?: string;
    minCharacters?: number;
    maxCharacters?: number;
}
