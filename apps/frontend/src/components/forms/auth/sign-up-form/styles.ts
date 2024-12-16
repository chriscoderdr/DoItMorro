import { StyleSheet, Platform } from "react-native";
import { Theme } from "@react-navigation/native";

interface SignUpFormStylesParams {
    theme: Theme & {
        spacing: {
            small: number;
            medium: number;
            large: number;
        };
    };
}

const getSignUpFormStyles = ({ theme }: SignUpFormStylesParams) =>
    StyleSheet.create({
        container: {
            paddingHorizontal: theme.spacing.large,
            paddingVertical: theme.spacing.medium,
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            maxWidth: Platform.OS === "web" ? 500 : "100%",
            width: "100%",
        },
        title: {
            marginBottom: theme.spacing.medium,
            fontSize: theme.fonts.sizes.large.fontSize,
            fontFamily: theme.fonts.bold.fontFamily,
        },
        inputContainer: {
            gap: theme.spacing.medium,
        },
        buttonContainer: {
            marginTop: theme.spacing.large,
            alignItems: "center",
        },
        switchToLogin: {
            marginTop: theme.spacing.medium,
            alignItems: "center",
        },
    });

export { getSignUpFormStyles };
