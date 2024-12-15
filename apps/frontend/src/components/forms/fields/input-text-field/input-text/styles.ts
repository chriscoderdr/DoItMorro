import { Platform, StyleSheet, ViewStyle } from "react-native";
import { Theme } from "@react-navigation/native";

interface InputTextStylesParams {
    fullWidth: boolean;
    theme: Theme & {
        roundness: number;
        spacing: {
            none: number;
            tiny: number;
            small: number;
            medium: number;
            large: number;
            extraLarge: number;
        };
        fonts: {
            regular: { fontFamily: string; fontWeight: string };
            sizes: { medium: { fontSize: number; lineHeight: number } };
        };
        colors: {
            border: string;
            text: string;
            background: string;
            primary: string;
            secondaryOnBackground: string;
        };
    };
}

const getInputTextStyles = ({ fullWidth, theme }: InputTextStylesParams) => {
    const fullWidthStyle: ViewStyle = fullWidth ? { alignSelf: "stretch" } : {};

    const { fontSize, lineHeight } = theme.fonts.sizes.medium;

    return StyleSheet.create({
        container: {
            paddingVertical: theme.spacing.medium,
            paddingHorizontal: theme.spacing.large,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.roundness,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.background,
            ...fullWidthStyle,
        },
        input: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize,
            lineHeight,
            color: theme.colors.text,
            flex: 1,
            ...(Platform.OS === "web" ? { ["outlineStyle" as string]: "none" } : {}), // Dynamic key for web
        },
        inputFocus: {
            borderColor: theme.colors.primary, // Highlighted border color
            borderWidth: 2, // Thicker border on focus
        },
        iconContainer: {
            marginLeft: theme.spacing.small,
        },
    });
};

export { getInputTextStyles };
