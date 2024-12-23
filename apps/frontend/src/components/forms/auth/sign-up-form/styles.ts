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
        privacyContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: theme.spacing.medium,
            marginBottom: theme.spacing.large,
        },
        checkbox: {
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: theme.colors.border,
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing.small,
        },
        checkboxInner: {
            width: 12,
            height: 12,
            borderRadius: 2,
            backgroundColor: "transparent",
        },
        privacyText: {
            fontSize: 14,
            textDecorationLine: "underline",
        },
    });

export { getSignUpFormStyles };
