import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

export const getCalendarStyles = (
    theme: Theme & {
        spacing: {
            none: number;
            tiny: number;
            small: number;
            medium: number;
            large: number;
        };
        fonts: {
            sizes: {
                small: { fontSize: number; lineHeight: number };
                medium: { fontSize: number; lineHeight: number };
                large: { fontSize: number; lineHeight: number };
            };
        };
        roundness: number;
    },
) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            borderRadius: theme.roundness,
            padding: theme.spacing.medium,
            width: "100%",
            maxWidth: 400,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.medium,
        },
        yearSelectorContainer: {
            alignItems: "center",
        },
        yearSelectorButton: {
            marginTop: theme.spacing.tiny,
            paddingVertical: theme.spacing.small,
            paddingHorizontal: theme.spacing.medium,
            borderRadius: theme.roundness / 2,
            backgroundColor: theme.colors.secondaryBackground,
        },
        headerText: {
            fontSize: theme.fonts.sizes.large.fontSize,
            lineHeight: theme.fonts.sizes.large.lineHeight,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        headerYear: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            lineHeight: theme.fonts.sizes.medium.lineHeight,
            color: theme.colors.primary,
            textDecorationLine: "underline",
        },
        currentMonth: {
            color: theme.colors.notification,
        },
        currentYear: {
            fontWeight: "bold",
            color: theme.colors.notification,
        },
        navButtonContainer: {
            padding: theme.spacing.small,
            borderRadius: theme.roundness / 2,
            backgroundColor: theme.colors.card,
        },
        navButton: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            color: theme.colors.primary,
        },
        calendarBody: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
        },
        todayButton: {
            marginTop: theme.spacing.medium,
            padding: theme.spacing.medium,
            backgroundColor: theme.colors.notification,
            borderRadius: theme.roundness,
            alignItems: "center",
        },
        closeButton: {
            marginTop: theme.spacing.medium,
            padding: theme.spacing.medium,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.roundness,
            alignItems: "center",
        },
    });
