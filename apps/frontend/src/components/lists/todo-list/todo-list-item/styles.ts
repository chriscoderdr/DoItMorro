import { Platform, StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface TodoListItemStylesParams {
    theme: Theme & {
        fonts: {
            regular: { fontFamily: string; fontWeight: string };
            bold: { fontFamily: string; fontWeight: string };
            sizes: {
                small: { fontSize: number; lineHeight: number };
                medium: { fontSize: number; lineHeight: number };
                large: { fontSize: number; lineHeight: number };
            };
        };
        colors: {
            background: string;
            text: string;
            secondaryOnBackground: string;
            notification: string;
            primary: string;
            card: string;
            onPrimary: string;
            completedBackground: string;
        };
        spacing: {
            none: number;
            small: number;
            medium: number;
            large: number;
        };
        roundness: number;
    };
}

export const getTodoListItemStyles = ({ theme }: TodoListItemStylesParams) =>
    StyleSheet.create({
        cardContainer: {
            backgroundColor: theme.colors.card,
            borderRadius: theme.roundness,
            padding: theme.spacing.medium,
            marginVertical: theme.spacing.small,
            marginHorizontal: theme.spacing.medium,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
        },
        completedCard: {
            backgroundColor: theme.colors.completedBackground,
            borderWidth: 1,
            borderColor: theme.colors.notification,
        },
        pastDueCard: {
            borderColor: theme.colors.notification,
            borderWidth: 1,
        },
        cardContent: {
            flexDirection: "column",
        },
        cardHeader: {
            flexDirection: "row",
            alignItems: "center",
        },
        cardTitle: {
            fontFamily: theme.fonts.bold.fontFamily,
            fontSize: theme.fonts.sizes.medium.fontSize,
            color: theme.colors.text,
            flex: 1,
        },
        pastDueText: {
            marginTop: theme.spacing.small,
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            color: theme.colors.notification,
        },
        dueDate: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            color: theme.colors.notification,
            marginTop: theme.spacing.small,
        },
        checkboxWrapper: {
            padding: 8,
            borderRadius: theme.spacing.large,
            marginRight: theme.spacing.small,
            justifyContent: "center",
            alignItems: "center",
        },
        checkboxPressed: {
            backgroundColor: theme.colors.card,
        },
        checkbox: {
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            justifyContent: "center",
            alignItems: "center",
        },
        checkboxChecked: {
            backgroundColor: theme.colors.primary,
        },
        checkboxMark: {
            color: theme.colors.onPrimary,
            fontWeight: "bold",
            fontSize: 14,
        },
        deleteButton: {
            marginTop: theme.spacing.medium,
            backgroundColor: theme.colors.notification,
            padding: theme.spacing.medium,
            borderRadius: theme.roundness,
            alignSelf: Platform.OS === "web" ? "flex-end" : "flex-end",
            alignItems: "center",
            width: Platform.OS === "web" ? 250 : "auto",
        },
        deleteButtonText: {
            fontFamily: theme.fonts.bold.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            color: theme.colors.onPrimary,
        },
    });
