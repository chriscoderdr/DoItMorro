import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Header } from "@/components/common/header";

export default function TabLayout() {
    const theme = useTheme(); // Access theme for consistent styling

    return (
        <Tabs
            screenOptions={{
                // Tab Bar Styling
                tabBarStyle: {
                    backgroundColor: theme.colors.background, // Light gray background
                    borderTopWidth: 0,
                    elevation: 4,
                    height: 70,
                },

                tabBarShowLabel: false, // Removes text labels
                tabBarActiveTintColor: theme.colors.onPrimary, // White for active icons
                tabBarInactiveTintColor: theme.colors.secondaryText, // Muted gray-green
                tabBarItemStyle: {
                    marginHorizontal: 12, // Add horizontal spacing between tabs
                },

                header: ({ route }) => {
                    const isProfile = route.name === "profile";
                    return (
                        <Header
                            showProfilePicture={isProfile}
                            profilePicture="https://example.com/profile.jpg"
                            onProfilePress={() => console.log("Profile Picture Pressed")}
                        />
                    );
                },
            }}
        >
            {/* Dashboard Tab */}
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View
                            style={[
                                styles.iconContainer,
                                focused && { backgroundColor: theme.colors.primary },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="calendar-month"
                                size={28}
                                color={focused ? theme.colors.onPrimary : color}
                            />
                        </View>
                    ),
                }}
            />

            {/* Profile Tab */}
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View
                            style={[
                                styles.iconContainer,
                                focused && { backgroundColor: theme.colors.primary },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="account-circle-outline"
                                size={28}
                                color={focused ? theme.colors.onPrimary : color}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 48, // Fixed size for the icon container
        height: 48,
        borderRadius: 24, // Perfect circle for active tabs
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
});
