import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

interface SocialLoginStylesParams {
    theme: Theme & {
        colors: {
            border: string;
            secondaryOnBackground: string;
            card: string;
            shadow: string;
        };
        fonts: {
            sizes: {
                small: { fontSize: number; lineHeight: number };
            };
        };
        spacing: {
            medium: number;
            small: number;
            tiny: number;
        };
    };
}

export const getSocialLoginStyles = ({ theme }: SocialLoginStylesParams) => {
    const { fontSize, lineHeight } = theme.fonts.sizes.small;

    return StyleSheet.create({
        container: {
            alignItems: "center",
            marginVertical: theme.spacing.medium,
        },
        dividerContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: theme.spacing.small,
        },
        line: {
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.border,
        },
        dividerText: {
            marginHorizontal: theme.spacing.small,
            fontSize,
            lineHeight,
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "center",
            gap: theme.spacing.medium,
        },
        button: {
            width: 60,
            height: 60,
            borderRadius: theme.roundness,
            backgroundColor: theme.colors.card,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: theme.colors.shadow || "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 3,
        },
        icon: {
            width: 30,
            height: 30,
            resizeMode: "contain",
        },
    });
};
