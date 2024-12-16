import React from "react";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getTextStyles } from "./styles";
import { IThemedTextProps } from "./props";

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
                : variant === "button"
                  ? "onPrimary"
                  : "text");

    const styles = getTextStyles({ variant, align, bold, color: resolvedColor, theme });

    return (
        <Text style={[styles.text, style]} {...props}>
            {children}
        </Text>
    );
};

export { ThemedText };
