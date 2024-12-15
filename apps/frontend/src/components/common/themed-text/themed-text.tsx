import React from "react";
import { Text, TextProps } from "react-native";
import { Theme, useTheme } from "@react-navigation/native";
import { getTextStyles } from "./styles";

interface IThemedTextProps extends TextProps {
    variant?: "title" | "subtitle" | "body" | "caption" | "overline" | "link";
    color?: keyof Theme["colors"];
    align?: "left" | "center" | "right" | "justify";
    bold?: boolean;
}

const ThemedText: React.FC<IThemedTextProps> = ({
    children,
    variant = "body",
    color,
    align = "left",
    bold = false,
    style,
    ...props
}) => {
    const theme = useTheme();

    const resolvedColor =
        color ||
        (variant === "subtitle"
            ? "secondaryOnBackground"
            : variant === "caption" || variant === "overline"
              ? "secondaryText"
              : variant === "link"
                ? "link"
                : "text");

    const styles = getTextStyles({ variant, align, bold, color: resolvedColor, theme });

    return (
        <Text style={[styles.text, style]} {...props}>
            {children}
        </Text>
    );
};

export { ThemedText };
