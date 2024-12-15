import { StyleSheet, Platform } from "react-native";
import { Theme } from "@react-navigation/native";

interface LoginFormStylesParams {
    theme: Theme & {
        spacing: {
            small: number;
            medium: number;
            large: number;
        };
    };
}

const getLoginFormStyles = ({ theme }: LoginFormStylesParams) =>
    StyleSheet.create({
        container: {
            paddingHorizontal: theme.spacing.large,
            paddingVertical: theme.spacing.medium,
            flex: 1,
            justifyContent: "center",
            alignSelf: "center", // Center horizontally on web
            maxWidth: Platform.OS === "web" ? 500 : "100%", // Restrict width on web
            width: "100%",
        },
        title: {
            marginBottom: theme.spacing.small,
        },
        subtitle: {
            marginBottom: theme.spacing.medium,
        },
        inputContainer: {
            gap: theme.spacing.medium,
        },
        buttonContainer: {
            marginTop: theme.spacing.medium,
        },
        socialLoginContainer: {
            marginVertical: theme.spacing.medium,
            alignItems: "center",
        },
        dontHaveAnAccount: {
            marginVertical: theme.spacing.large,
            alignItems: "center",
        },
        dontHaveAnAccountText: {
            textAlign: "center",
        },
    });

export { getLoginFormStyles };
