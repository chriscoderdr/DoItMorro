import { StyleSheet } from "react-native";

interface LoadingIndicatorStylesParams {
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

const getLoadingIndicatorStyles = ({ theme }: LoadingIndicatorStylesParams) =>
    StyleSheet.create({
        indicator: {
            margin: theme.spacing.large,
        },
    });

export { getLoadingIndicatorStyles };
