import { StyleSheet } from "react-native";

interface LoadingScreenStylesParams {
    theme: {
        colors: {
            background: string;
            primary: string;
        };
        spacing: {
            large: number;
        };
    };
}

const getLoadingScreenStyles = ({ theme }: LoadingScreenStylesParams) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.background,
        },
    });

export { getLoadingScreenStyles };
