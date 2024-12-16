import React, { useEffect, useState } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebaseService } from "@/services";
import { ProfileMenu } from "./profile-menu";
import { useTheme } from "@react-navigation/native";
import { getProfileScreenStyles } from "./styles";

const ProfileScreen = () => {
    const theme = useTheme();
    const styles = getProfileScreenStyles({ theme });

    const [linkedProviders, setLinkedProviders] = useState<string[]>([]);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const user = firebaseService.auth.currentUser;

    useEffect(() => {
        const initializeProfile = async () => {
            await fetchLinkedProviders();
            await fetchProfilePhoto();
        };

        const fetchLinkedProviders = async () => {
            try {
                const providers = await getLinkedProviders();
                setLinkedProviders(providers);
            } catch (error) {
                console.error("Error fetching linked providers:", error);
                Alert.alert("Error", "Failed to fetch linked providers.");
            }
        };

        const fetchProfilePhoto = async () => {
            try {
                const photo = await getSingleProfilePhoto();
                if (photo) setProfilePhoto(photo);
            } catch (error) {
                console.error("Error fetching profile photo:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeProfile();
    }, []);

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => firebaseService.auth.signOut() },
        ]);
    };

    const handleSocialConnect = async (network: string) => {
        try {
            Alert.alert(`Connect to ${network}`, `Connecting to ${network}...`);
        } catch (error) {
            console.error(`Error linking with ${network}:`, error);
            Alert.alert("Error", `Failed to link with ${network}.`);
        }
    };

    const menuOptions = [
        { id: "1", label: "Edit Profile", icon: "person-circle-outline", action: () => {} },
        { id: "2", label: "Change Password", icon: "lock-closed-outline", action: () => {} },
        { id: "3", label: "Logout", icon: "log-out-outline", action: handleLogout },
    ];

    const socialOptions = [
        {
            id: "4",
            label: "Connect with Google",
            icon: "logo-google",
            providerId: "google.com",
        },
        {
            id: "5",
            label: "Connect with Facebook",
            icon: "logo-facebook",
            providerId: "facebook.com",
        },
    ].map((option) => ({
        ...option,
        connected: linkedProviders.includes(option.providerId),
        action: () => handleSocialConnect(option.label.split(" ")[2]),
    }));

    const combinedOptions = [
        {
            type: "header",
            label: user?.displayName || "Guest",
            email: user?.email || "No email available",
            profilePicture: profilePhoto,
        },
        ...menuOptions,
        { type: "section", label: "Social Connections" },
        ...socialOptions,
    ];

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ProfileMenu
                options={combinedOptions}
                onItemPress={(item) => item.action && item.action()}
                profilePhoto={profilePhoto}
                displayName={user?.displayName}
                email={user?.email}
            />
        </SafeAreaView>
    );
};

export { ProfileScreen };
