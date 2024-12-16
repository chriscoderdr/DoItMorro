import { StyleSheet } from "react-native";
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
            paddingBottom: theme.spacing.large * 3.5,
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
        floatingButton: {
            position: "absolute",
            bottom: theme.spacing.large * 2.8,
            right: theme.spacing.large,
            backgroundColor: theme.colors.primary,
            width: 64,
            height: 64,
            borderRadius: 32,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
        },
        floatingButtonText: {
            fontSize: 32,
            color: theme.colors.onPrimary,
            fontWeight: "bold",
        },
    });
