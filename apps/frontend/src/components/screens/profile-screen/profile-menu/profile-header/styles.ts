import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface ProfileHeaderStylesParams {
    theme: Theme & {
        fonts: {
            bold: { fontFamily: string };
            regular: { fontFamily: string };
            sizes: {
                small: { fontSize: number };
                medium: { fontSize: number };
                large: { fontSize: number };
            };
        };
        colors: {
            background: string;
            primary: string;
            secondaryOnBackground: string;
            shadow: string;
        };
        spacing: {
            small: number;
            medium: number;
            large: number;
        };
    };
}
export const getProfileHeaderStyles = ({ theme }: ProfileHeaderStylesParams) =>
    StyleSheet.create({
        profileContainer: {
            backgroundColor: theme.colors.card, // Consistent with menu items
            padding: theme.spacing.medium,
            marginHorizontal: theme.spacing.large,
            borderRadius: theme.spacing.small,
            shadowColor: theme.colors.shadow,
            shadowOpacity: 0.15, // Lighter shadow for subtlety
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            elevation: 3,
            marginBottom: theme.spacing.medium, // Adds space between header and menu
        },
        profileInfo: {
            flexDirection: "row",
            alignItems: "center",
        },
        profilePicture: {
            width: 70,
            height: 70,
            borderRadius: 35,
            marginRight: theme.spacing.medium,
            borderWidth: 3, // Slightly thicker border for emphasis
            borderColor: theme.colors.primary,
        },
        textContainer: {
            flex: 1,
        },
        profileName: {
            fontSize: theme.fonts.sizes.large.fontSize,
            fontFamily: theme.fonts.bold.fontFamily,
            color: theme.colors.text, // Matches menu text color
        },
        profileEmail: {
            fontSize: theme.fonts.sizes.medium.fontSize,
            fontFamily: theme.fonts.regular.fontFamily,
            color: theme.colors.secondaryOnBackground,
            marginTop: theme.spacing.small,
        },
    });
