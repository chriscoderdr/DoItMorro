import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface ProfileScreenStylesParams {
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
        };
        spacing: {
            small: number;
            medium: number;
            large: number;
        };
    };
}

export const getProfileScreenStyles = ({ theme }: ProfileScreenStylesParams) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        profileInfo: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: theme.spacing.large,
        },
        profilePicture: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: theme.spacing.medium,
        },
        profileName: {
            fontSize: theme.fonts.sizes.large.fontSize,
            fontFamily: theme.fonts.bold.fontFamily,
            color: theme.colors.primary,
        },
        profileEmail: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            fontFamily: theme.fonts.regular.fontFamily,
            color: theme.colors.secondaryOnBackground,
            marginTop: theme.spacing.small,
        },
        listContent: {
            paddingHorizontal: theme.spacing.large,
            paddingBottom: theme.spacing.large * 2,
        },
        menuItem: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.background,
            padding: theme.spacing.medium,
            borderRadius: theme.spacing.small,
            marginBottom: theme.spacing.small,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
        },
        connectedItem: {
            backgroundColor: theme.colors.notification,
        },
        menuIcon: {
            marginRight: theme.spacing.medium,
        },
        menuText: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            fontFamily: theme.fonts.bold.fontFamily,
            color: theme.colors.text,
        },
        sectionHeader: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            fontFamily: theme.fonts.bold.fontFamily,
            marginVertical: theme.spacing.medium,
            color: theme.colors.text,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });
