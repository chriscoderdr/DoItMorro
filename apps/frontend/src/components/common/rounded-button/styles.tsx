import { StyleSheet, FlexAlignType } from "react-native";
import { Theme } from "@react-navigation/native";

interface ButtonStylesParams {
    type: "primary" | "secondary";
    size: "small" | "medium" | "large";
    fullWidth: boolean;
    disabled: boolean;
    theme: Theme & {
        colors: {
            primary: string;
            onPrimary: string;
            secondaryBackground: string;
            secondaryText: string;
            secondaryBorder: string;
        };
        fonts: {
            regular: { fontFamily: string; fontWeight: "400" };
            medium: { fontFamily: string; fontWeight: "500" };
            bold: { fontFamily: string; fontWeight: "700" };
            sizes: {
                small: { fontSize: number; lineHeight: number };
                medium: { fontSize: number; lineHeight: number };
                large: { fontSize: number; lineHeight: number };
            };
        };
        spacing: {
            none: number;
            tiny: number;
            small: number;
            medium: number;
            large: number;
            extraLarge: number;
        };
    };
}

const getButtonStyles = ({ type, size, fullWidth, disabled, theme }: ButtonStylesParams) => {
    const buttonBackgroundColor =
        type === "primary" ? theme.colors.primary : theme.colors.secondaryBackground;
    const buttonTextColor =
        type === "primary" ? theme.colors.onPrimary : theme.colors.secondaryText;
    const borderColor = type === "secondary" ? theme.colors.secondaryBorder : undefined;
    const borderRadius = theme.roundness ?? 12;

    const paddingVertical =
        size === "small"
            ? theme.spacing.small
            : size === "large"
              ? theme.spacing.large
              : theme.spacing.medium;

    const paddingHorizontal =
        size === "small"
            ? theme.spacing.medium
            : size === "large"
              ? theme.spacing.extraLarge
              : theme.spacing.large;

    const { fontSize, lineHeight } =
        size === "small"
            ? theme.fonts.sizes.small
            : size === "large"
              ? theme.fonts.sizes.large
              : theme.fonts.sizes.medium;

    const font =
        size === "large"
            ? theme.fonts.bold
            : size === "small"
              ? theme.fonts.regular
              : theme.fonts.medium;

    return StyleSheet.create({
        buttonContainer: {
            paddingVertical,
            paddingHorizontal,
            backgroundColor: buttonBackgroundColor,
            borderRadius,
            alignSelf: fullWidth ? ("stretch" as FlexAlignType) : undefined,
            opacity: disabled ? 0.5 : 1,
            borderWidth: borderColor ? 1 : 0,
            borderColor: borderColor || "transparent",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 3,
        },
        buttonText: {
            color: buttonTextColor,
            fontSize,
            lineHeight,
            fontFamily: font.fontFamily,
            fontWeight: font.fontWeight,
            textAlign: "center",
        },
    });
};

export { getButtonStyles };
