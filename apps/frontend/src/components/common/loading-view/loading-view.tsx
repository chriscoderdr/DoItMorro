// /src/components/loading-view/index.tsx

import React from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

const PRIMARY_COLOR = "#ff6f61";

const LoadingView = ({ message = "Loading..." }: { message?: string }) => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
            <Text style={styles.loadingText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 16,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#555",
    },
});

export { LoadingView };
