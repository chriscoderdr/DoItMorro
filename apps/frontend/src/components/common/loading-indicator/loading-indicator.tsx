import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getLoadingIndicatorStyles } from "./styles";
import { DoItMorroTheme } from "@/theming";

const LoadingIndicator = () => {
    const theme = useTheme();
    const styles = getLoadingIndicatorStyles({ theme: DoItMorroTheme });

    return <ActivityIndicator size="large" color={theme.colors.primary} style={styles.indicator} />;
};

export { LoadingIndicator };
