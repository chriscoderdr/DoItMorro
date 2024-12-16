import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface DatePickerInputStylesParams {
    theme: Theme & {
        fonts: {
            regular: { fontFamily: string; fontWeight: string };
            sizes: {
                small: { fontSize: number; lineHeight: number };
                medium: { fontSize: number; lineHeight: number };
            };
        };
        colors: {
            text: string;
            secondaryOnBackground: string;
            border: string;
            background: string;
        };
        spacing: {
            small: number;
        };
    };
}

export const getDatePickerInputStyles = ({ theme }: DatePickerInputStylesParams) =>
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
        inputField: {
            padding: theme.spacing.small,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 8,
            backgroundColor: theme.colors.background,
        },
        inputText: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.medium.fontSize,
            lineHeight: theme.fonts.sizes.medium.lineHeight,
            color: theme.colors.text,
        },
    });
