import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface YearSelectorStylesParams {
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
            onPrimary: string;
            notification: string;
        };
        spacing: {
            small: number;
            medium: number;
        };
    };
}

export const getYearSelectorStyles = ({ theme }: YearSelectorStylesParams) =>
    StyleSheet.create({
        container: {
            maxHeight: 250,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.roundness,
            backgroundColor: theme.colors.background,
            padding: theme.spacing.medium,
        },
        listContent: {
            paddingVertical: theme.spacing.small,
        },
        yearItem: {
            paddingVertical: theme.spacing.medium,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.roundness,
            marginVertical: theme.spacing.small,
            backgroundColor: theme.colors.card,
        },
        activeYearItem: {
            backgroundColor: theme.colors.primary,
        },
        yearText: {
            fontSize: theme.fonts.sizes.medium.fontSize,
        },
        activeYearText: {
            fontWeight: theme.fonts.bold.fontWeight,
        },
        currentYearText: {
            color: theme.colors.notification,
            fontWeight: theme.fonts.bold.fontWeight,
        },
        closeButton: {
            marginTop: theme.spacing.medium,
            padding: theme.spacing.medium,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.roundness,
            alignItems: "center",
        },
        closeButtonText: {
            fontWeight: theme.fonts.bold.fontWeight,
        },
    });
