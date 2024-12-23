import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebaseService } from "@/services";
import { ProfileMenu } from "./profile-menu";
import { useTheme } from "@react-navigation/native";
import { getProfileScreenStyles } from "./styles";
import { ConfirmationModal } from "@/components/common/confirmation-modal";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
    const theme = useTheme();
    const router = useRouter();
    const styles = getProfileScreenStyles({ theme });

    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        title: "",
        message: "",
        onConfirm: () => {},
    });

    const user = firebaseService.auth.currentUser;

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleLogout = () => {
        setModalConfig({
            title: "Logout",
            message: "Are you sure you want to logout?",
            onConfirm: async () => {
                setModalVisible(false);
                await firebaseService.auth.signOut();
                router.navigate("/login");
            },
        });
        setModalVisible(true);
    };

    const handleDeleteMe = () => {
        router.push("/delete-me");
    };

    const menuOptions = [
        { id: "3", label: "Logout", icon: "log-out-outline", action: handleLogout },
        { id: "4", label: "Delete your account", icon: "", action: handleDeleteMe },
    ];

    const combinedOptions = [
        {
            type: "header",
            label: user?.displayName || "Guest",
            email: user?.email || "No email available",
        },
        ...menuOptions,
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
                displayName={user?.displayName}
                email={user?.email}
            />
            <ConfirmationModal
                visible={modalVisible}
                title={modalConfig.title}
                message={modalConfig.message}
                onConfirm={modalConfig.onConfirm}
                onCancel={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
};

export { ProfileScreen };
