import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface InputTextAreaFieldStylesParams {
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
            notification: string;
            border: string;
            background: string;
            primary: string; // To highlight the border on focus
        };
        spacing: {
            small: number;
            medium: number;
        };
    };
}

export const getInputTextAreaFieldStyles = ({ theme }: InputTextAreaFieldStylesParams) =>
    StyleSheet.create({
        container: {
            marginBottom: theme.spacing.medium,
        },
        label: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            lineHeight: theme.fonts.sizes.small.lineHeight,
            color: theme.colors.secondaryOnBackground,
            marginBottom: theme.spacing.small,
        },
        textArea: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.medium.fontSize,
            lineHeight: theme.fonts.sizes.medium.lineHeight,
            color: theme.colors.text,
            backgroundColor: theme.colors.background, // Background color
            borderWidth: 1,
            borderColor: theme.colors.border, // Default border color
            borderRadius: 8,
            padding: theme.spacing.small,
            minHeight: 120,
            textAlignVertical: "top",
        },
        textAreaFocused: {
            borderColor: theme.colors.primary, // Highlight border color on focus
        },
        errorText: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            lineHeight: theme.fonts.sizes.small.lineHeight,
            color: theme.colors.notification,
            marginTop: theme.spacing.small,
            textAlign: "left",
        },
        characterFeedbackContainer: {
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: theme.spacing.small,
        },
        characterFeedbackText: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            color: theme.colors.secondaryOnBackground,
        },
    });
