import { Theme } from "@react-navigation/native";
import { TextProps } from "react-native";

interface IThemedTextProps extends TextProps {
    variant?: "title" | "subtitle" | "body" | "caption" | "overline" | "link" | "button";
    color?: keyof Theme["colors"];
    align?: "left" | "center" | "right" | "justify";
    bold?: boolean;
}
export { IThemedTextProps };
