import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface EditTodoFormStylesParams {
    theme: Theme & {
        colors: {
            primary: string;
            background: string;
            text: string;
            secondaryOnBackground: string;
            border: string;
        };
        spacing: {
            small: number;
            medium: number;
            large: number;
        };
        fonts: {
            regular: { fontFamily: string };
            bold: { fontFamily: string };
            sizes: {
                medium: { fontSize: number };
                large: { fontSize: number };
            };
        };
    };
}

export const getEditTodoFormStyles = ({ theme }: EditTodoFormStylesParams) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: theme.spacing.large,
            paddingVertical: theme.spacing.medium,
            backgroundColor: theme.colors.background,
        },
        title: {
            marginBottom: theme.spacing.small,
            fontSize: theme.fonts.sizes.large.fontSize,
            fontFamily: theme.fonts.bold.fontFamily,
            color: theme.colors.text,
            textAlign: "center",
        },
        subtitle: {
            marginBottom: theme.spacing.medium,
            fontSize: theme.fonts.sizes.medium.fontSize,
            fontFamily: theme.fonts.regular.fontFamily,
            color: theme.colors.secondaryOnBackground,
            textAlign: "center",
        },
        inputContainer: {
            gap: theme.spacing.medium,
            marginBottom: theme.spacing.large,
        },
        buttonContainer: {
            marginTop: theme.spacing.large,
        },
        modalOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent overlay
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        datePickerContainer: {
            marginBottom: theme.spacing.medium,
        },
        datePickerLabel: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            color: theme.colors.text,
            marginBottom: 4,
        },
        datePickerInput: {
            padding: 12,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.spacing.small,
            backgroundColor: theme.colors.background,
        },
        datePickerText: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            color: theme.colors.text,
        },
    });
