import { StyleSheet, Platform } from "react-native";
import { Theme } from "@react-navigation/native";

interface TodoListStylesParams {
    theme: Theme & {
        colors: {
            background: string;
            notification: string;
            primary: string;
            onPrimary: string;
            secondaryOnBackground: string;
        };
        spacing: {
            medium: number;
            large: number;
        };
    };
}

export const getTodoListStyles = ({ theme }: TodoListStylesParams) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            position: "relative",
        },
        listContent: {
            paddingBottom: theme.spacing.large * 2,
        },
        sectionHeader: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colors.primary,
            paddingVertical: theme.spacing.medium,
            paddingHorizontal: theme.spacing.large,
            backgroundColor: theme.colors.background,
        },
        emptyStateContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        emptyEmoji: {
            fontSize: 64,
            marginBottom: theme.spacing.medium,
        },
        emptyMessage: {
            fontSize: 16,
            color: theme.colors.secondaryOnBackground,
            textAlign: "center",
        },
        pastDueTask: {
            backgroundColor: theme.colors.notification, // Highlight with a "past due" color
            padding: theme.spacing.medium,
            borderRadius: theme.roundness,
            marginVertical: theme.spacing.small,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
        },
        pastDueText: {
            color: theme.colors.onPrimary,
        },
    });
