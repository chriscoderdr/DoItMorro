import { IInputTextProps } from "./input-text/props";

export interface IInputTextFieldProps extends IInputTextProps {
    label: string;
    IconComponent?: React.ReactNode;
    onIconPress?: () => void;
    fullWidth?: boolean;
    securedEntry?: boolean;
    errorText?: string;
    errorTestId?: string;
}
