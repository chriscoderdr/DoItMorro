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
            position: "relative",
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
        strikethroughText: {
            textDecorationLine: "line-through",
            color: theme.colors.secondaryOnBackground,
        },
        cardDescription: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            color: theme.colors.secondaryOnBackground,
            marginTop: theme.spacing.small,
        },
        dueDate: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            color: theme.colors.notification,
            marginTop: theme.spacing.small,
        },
        checkboxWrapper: {
            padding: 8, // Increase the touch area
            borderRadius: theme.spacing.large, // Ensure a rounded area for better tap feedback
            marginRight: theme.spacing.small,
            justifyContent: "center",
            alignItems: "center",
        },
        checkboxPressed: {
            backgroundColor: theme.colors.card, // Optional visual feedback on press
        },
        checkbox: {
            width: 24, // Size of the actual checkbox
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
        completedAtContainer: {
            marginTop: theme.spacing.medium,
            paddingVertical: theme.spacing.large,
            paddingHorizontal: theme.spacing.medium,
            backgroundColor: theme.colors.completedBackground,
            borderRadius: theme.roundness,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
            position: "relative",
        },
        completedAtLabel: {
            fontFamily: theme.fonts.bold.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            color: theme.colors.secondaryOnBackground,
        },
        completedAtTimestamp: {
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: theme.fonts.sizes.small.fontSize,
            color: theme.colors.text,
            marginTop: theme.spacing.small,
        },
        completedBadge: {
            position: "absolute",
            bottom: theme.spacing.small,
            right: theme.spacing.small,
            backgroundColor: theme.colors.notification,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: theme.roundness,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
        },
        completedBadgeText: {
            fontSize: theme.fonts.sizes.small.fontSize,
            color: theme.colors.onPrimary,
            fontWeight: "bold",
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
