import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface HeaderStylesParams {
    theme: Theme & {
        fonts: {
            bold: { fontFamily: string };
            sizes: {
                medium: { fontSize: number };
            };
        };
        colors: {
            primary: string;
            text: string;
            secondaryOnBackground: string;
            background: string;
            onPrimary: string;
        };
        spacing: {
            small: number;
            medium: number;
            large: number;
        };
    };
}

export const getHeaderStyles = ({ theme }: HeaderStylesParams) =>
    StyleSheet.create({
        safeArea: {
            backgroundColor: theme.colors.primary,
        },
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: theme.spacing.medium,
            paddingVertical: theme.spacing.small,
            backgroundColor: theme.colors.primary,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
        },
        sideElement: {
            width: 36,
            justifyContent: "center",
            alignItems: "center",
        },
        centerContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        appName: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            fontFamily: theme.fonts.bold.fontFamily,
            color: theme.colors.onPrimary,
        },
        logo: {
            width: 120,
            height: 40,
            resizeMode: "contain",
        },
        profilePicture: {
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 2,
            borderColor: theme.colors.onPrimary,
        },
    });
