import { StyleSheet, Platform } from "react-native";
import { Theme } from "@react-navigation/native";

interface ConfirmationModalStylesParams {
    theme: Theme & {
        colors: {
            primary: string;
            background: string;
            text: string;
            secondaryOnBackground: string;
            notification: string;
            cancelButtonBackground: string;
            confirmButtonBackground: string;
            cancelText: string;
            confirmText: string;
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

export const getConfirmationModalStyles = ({ theme }: ConfirmationModalStylesParams) =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            justifyContent: "center",
            alignItems: "center",
        },
        modalContainer: {
            width: Platform.OS === "web" ? "40%" : "85%",
            maxHeight: Platform.OS === "web" ? "70%" : "auto",
            backgroundColor: theme.colors.background,
            borderRadius: theme.spacing.medium,
            padding: theme.spacing.large,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            elevation: 5,
        },
        title: {
            fontSize: theme.fonts.sizes.large.fontSize,
            fontFamily: theme.fonts.bold.fontFamily,
            color: theme.colors.text,
            marginBottom: theme.spacing.medium,
            textAlign: "center",
        },
        message: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            fontFamily: theme.fonts.regular.fontFamily,
            color: theme.colors.secondaryOnBackground,
            marginBottom: theme.spacing.large,
            textAlign: "center",
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing.large,
        },
        button: {
            width: Platform.OS === "web" ? 140 : "45%", // Static width for web, proportional for mobile
            paddingVertical: theme.spacing.medium + 2, // Add slight padding for better touch size
            marginHorizontal: theme.spacing.small,
            borderRadius: theme.spacing.small,
            alignItems: "center",
            justifyContent: "center",
            elevation: 2,
        },
        cancelButton: {
            backgroundColor: theme.colors.cancelButtonBackground,
        },
        confirmButton: {
            backgroundColor: theme.colors.confirmButtonBackground,
        },
        cancelText: {
            color: theme.colors.cancelText,
            fontFamily: theme.fonts.bold.fontFamily,
            fontSize: theme.fonts.sizes.medium.fontSize,
            textAlign: "center",
        },
        confirmText: {
            color: theme.colors.confirmText,
            fontFamily: theme.fonts.bold.fontFamily,
            fontSize: theme.fonts.sizes.medium.fontSize,
            textAlign: "center",
        },
    });
