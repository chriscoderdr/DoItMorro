import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

const PrivacyScreen = () => {
    const theme = useTheme();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.header, { color: theme.colors.primary }]}>Privacy Policy</Text>
            <Text style={[styles.paragraph, { color: theme.colors.text }]}>
                Welcome to DoItMorro! At GrowIdea LLC, we are committed to protecting your privacy
                and ensuring the security of your personal information. This Privacy Policy outlines
                how we collect, use, and safeguard the information you provide when using our app
                and website.
            </Text>

            <Text style={[styles.subHeader, { color: theme.colors.primary }]}>
                Information We Collect
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.text }]}>
                When you sign up for DoItMorro, we collect the following information:
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Your username and password
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>• Your full name</Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Usage statistics (e.g., how you interact with the app, features used, etc.)
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Device or Other IDs (e.g., Advertising ID, Android ID, IMEI, BSSID, MAC address)
            </Text>

            <Text style={[styles.subHeader, { color: theme.colors.primary }]}>
                How We Use Your Information
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.text }]}>
                We use the information collected to:
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Provide and improve the app's functionality and user experience
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Ensure the security of your account and personal data
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Analyze usage patterns to enhance app features and performance
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Identify and address potential fraud or security risks
            </Text>

            <Text style={[styles.subHeader, { color: theme.colors.primary }]}>
                Sharing Your Information
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.text }]}>
                Your personal information will never be shared with third parties without your
                explicit consent, except as required by law or to protect the security of our
                platform.
            </Text>

            <Text style={[styles.subHeader, { color: theme.colors.primary }]}>Your Rights</Text>
            <Text style={[styles.paragraph, { color: theme.colors.text }]}>
                You have the right to:
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Access, update, or delete your personal data
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Opt-out of analytics tracking at any time
            </Text>
            <Text style={[styles.listItem, { color: theme.colors.text }]}>
                • Contact us with any questions or concerns about your privacy
            </Text>

            <Text style={[styles.subHeader, { color: theme.colors.primary }]}>Contact Us</Text>
            <Text style={[styles.paragraph, { color: theme.colors.text }]}>
                If you have any questions about this Privacy Policy or your data, please contact us
                at privacy@doitmorro.com.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 8,
    },
    listItem: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4,
    },
});

export default PrivacyScreen;
