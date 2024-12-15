import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface InputTextFieldStylesParams {
    theme: Theme & {
        fonts: {
            regular: { fontFamily: string; fontWeight: string };
            sizes: {
                small: { fontSize: number; lineHeight: number };
            };
        };
        colors: {
            text: string;
            secondaryOnBackground: string;
            notification: string;
        };
        spacing: {
            none: number;
            small: number;
        };
    };
}

export const getInputTextFieldStyles = ({ theme }: InputTextFieldStylesParams) =>
    StyleSheet.create({
        container: {
            marginBottom: theme.spacing.small,
        },
        label: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            lineHeight: theme.fonts.sizes.small.lineHeight,
            color: theme.colors.secondaryOnBackground,
            marginBottom: theme.spacing.small,
        },
        errorText: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            lineHeight: theme.fonts.sizes.small.lineHeight,
            color: theme.colors.notification,
            marginTop: theme.spacing.small,
            textAlign: "left",
        },
    });
