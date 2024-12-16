import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface ProfileMenuStylesParams {
    theme: Theme & {
        colors: {
            background: string;
            primary: string;
            text: string;
            secondaryOnBackground: string;
            notification: string;
            success: string;
            shadow: string;
        };
        fonts: {
            bold: { fontFamily: string };
            regular: { fontFamily: string };
            sizes: {
                medium: { fontSize: number };
                large: { fontSize: number };
            };
        };
        spacing: {
            small: number;
            medium: number;
            large: number;
        };
    };
}
export const getProfileMenuStyles = ({ theme }: ProfileMenuStylesParams) =>
    StyleSheet.create({
        sectionHeader: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            fontFamily: theme.fonts.bold.fontFamily,
            marginVertical: theme.spacing.medium,
            color: theme.colors.secondaryOnBackground,
        },
        menuItem: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.card, // Matches header card style
            padding: theme.spacing.medium,
            borderRadius: theme.spacing.small,
            marginBottom: theme.spacing.small,
            elevation: 3,
            shadowColor: theme.colors.shadow,
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 4,
        },
        connectedItem: {
            backgroundColor: theme.colors.successBackground, // A softer success color
            borderRadius: theme.spacing.small,
        },
        menuIcon: {
            marginRight: theme.spacing.medium,
        },
        menuText: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            fontFamily: theme.fonts.regular.fontFamily,
            color: theme.colors.text, // Unified text color
        },
        touchableItem: {
            shadowColor: theme.colors.shadow,
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
        },
        listContent: {
            paddingHorizontal: theme.spacing.large,
            paddingBottom: theme.spacing.large * 2,
        },
    });
