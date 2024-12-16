import { StyleSheet } from "react-native";

const getDateItemStyles = (theme: any) =>
    StyleSheet.create({
        day: {
            width: "14%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: theme.spacing.tiny,
            borderRadius: theme.roundness / 2,
            backgroundColor: theme.colors.card,
        },
        currentDay: {
            backgroundColor: theme.colors.primary,
            borderRadius: 50,
        },
        disabledDay: {
            backgroundColor: theme.colors.border,
        },
        dayText: {
            fontSize: theme.fonts.sizes.small.fontSize,
        },
        disabledDayText: {
            color: theme.colors.secondaryOnBackground,
        },
        currentDayText: {
            color: theme.colors.onPrimary,
        },
    });

export { getDateItemStyles };
