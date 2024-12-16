import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getLoadingScreenStyles } from "./styles";
import { DoItMorroTheme } from "@/theming";
import { LoadingIndicator } from "@/components/common/loading-indicator";

const LoadingScreen = () => {
    const theme = useTheme();
    const styles = getLoadingScreenStyles({ theme: DoItMorroTheme });

    return (
        <View style={styles.container}>
            <LoadingIndicator />
        </View>
    );
};

export { LoadingScreen };
