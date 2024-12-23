import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";

const DeleteMeScreen = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [isRequestSent, setIsRequestSent] = useState(false);

    const handleDeleteRequest = async () => {
        Alert.alert(
            "Confirm Deletion Request",
            "Are you sure you want to request account deletion? This action will start the deletion process, and you won't have access to your account after the process is completed.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Request",
                    style: "destructive",
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            // Mocking a request to the backend
                            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

                            // Simulate success
                            setIsRequestSent(true);
                            Alert.alert(
                                "Request Submitted",
                                "Your account deletion request has been successfully submitted. We will process your request shortly.",
                            );
                        } catch (error) {
                            Alert.alert(
                                "Error",
                                "Something went wrong while submitting your request. Please try again later.",
                            );
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.header, { color: theme.colors.primary }]}>
                Request Account Deletion
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.text }]}>
                If you want to request the deletion of your account and all associated data, you can
                do so here. Please note that this action is not instant, and you will receive an
                email confirmation once the process begins.
            </Text>
            {!isRequestSent ? (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.colors.notification }]}
                    onPress={handleDeleteRequest}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color={theme.colors.onPrimary} />
                    ) : (
                        <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
                            Request Deletion
                        </Text>
                    )}
                </TouchableOpacity>
            ) : (
                <Text style={[styles.successMessage, { color: theme.colors.successBackground }]}>
                    Your request has been submitted. Please check your email for updates.
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 32,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    successMessage: {
        marginTop: 16,
        fontSize: 16,
        textAlign: "center",
    },
});

export default DeleteMeScreen;
