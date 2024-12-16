import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "../../components/HapticTab";
import { IconSymbol } from "../../components/ui/IconSymbol";
import TabBarBackground from "../../components/ui/TabBarBackground";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useIntl } from "react-intl";
import { Header } from "@/components/common/header";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const intl = useIntl();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                header: ({ route }) => {
                    // Render a custom header for each screen
                    const isProfile = route.name === "profile";

                    return (
                        <Header
                            showProfilePicture={isProfile}
                            profilePicture="https://example.com/profile.jpg" // Replace with actual profile URL
                            onProfilePress={() => console.log("Profile Picture Pressed")}
                        />
                    );
                },
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: "absolute",
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: intl.formatMessage({
                        id: "tabs.dashboard.title",
                    }),
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="calendar.circle.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: intl.formatMessage({
                        id: "tabs.profile.title",
                    }),
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="person.circle.fill" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
