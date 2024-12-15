import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { KeyboardDismiss } from "./keyboard-dismiss";

const ScrollableFormContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined} // Disable height on web
                style={styles.keyboardAvoiding}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    keyboardShouldPersistTaps="handled" // Allow taps on input to persist focus
                >
                    <KeyboardDismiss>
                        <View style={styles.container}>{children}</View>
                    </KeyboardDismiss>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF", // Optional: for better web styling
    },
    keyboardAvoiding: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center", // Ensure content centers properly on all platforms
        padding: Platform.OS === "web" ? 20 : 0, // Add padding for better spacing on web
    },
});

export { ScrollableFormContainer };
