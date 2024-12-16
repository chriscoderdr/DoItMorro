// /src/components/no-internet-view/index.tsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface NoInternetViewProps {
    isConnected: boolean;
    hasError: boolean; // Parent-controlled error state
    errorMessage?: string; // Customizable error message
    onRetry?: () => void; // Custom retry handler, optional
}

const NoInternetView: React.FC<NoInternetViewProps> = ({
    isConnected,
    hasError,
    errorMessage,
    onRetry,
}) => {
    const displayMessage = () => {
        if (!isConnected) {
            return "You’re offline. Check your internet connection and try again.";
        }
        if (hasError) {
            return errorMessage || "Something went wrong. Please try again.";
        }
        return errorMessage || "Oops! Something went wrong. Please try again.";
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{displayMessage()}</Text>
            <TouchableOpacity
                style={[styles.retryButton, !isConnected && styles.disabledButton]}
                onPress={onRetry}
                disabled={!isConnected}
            >
                <Text style={styles.retryButtonText}>
                    {isConnected ? "Try Again" : "Reconnect"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    text: {
        fontSize: 16,
        color: "#888",
        marginBottom: 16,
        textAlign: "center",
    },
    retryButton: {
        backgroundColor: "#ff6f61",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    retryButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});

export { NoInternetView };
