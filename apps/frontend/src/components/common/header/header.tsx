import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getHeaderStyles } from "./styles";
import { assets } from "@/assets";

interface HeaderProps {
    showProfilePicture?: boolean;
    profilePicture?: string | null;
    onProfilePress?: () => void;
    showBackButton?: boolean;
    onBackPress?: () => void;
    appName?: string;
}

const Header: React.FC<HeaderProps> = ({
    showProfilePicture = false,
    profilePicture,
    onProfilePress,
    showBackButton = false,
    onBackPress,
    appName = "Do It Morro",
}) => {
    const theme = useTheme();
    const styles = getHeaderStyles({ theme });

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <View style={styles.container}>
                {/* Back Button */}
                {showBackButton ? (
                    <TouchableOpacity
                        style={styles.sideElement}
                        onPress={onBackPress}
                        accessibilityLabel="Go back"
                        testID="header-back-button"
                    >
                        <Ionicons
                            name="arrow-back-outline"
                            size={24}
                            color={theme.colors.onPrimary}
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.sideElement} />
                )}

                {/* App Name */}
                <View style={styles.centerContainer}>
                    <Text
                        style={styles.appName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        accessibilityLabel="App Name"
                        testID="header-app-name"
                    >
                        {appName}
                    </Text>
                </View>

                <View style={styles.sideElement}>
                    <Image
                        source={assets.imagesAssets.logo}
                        style={styles.logo}
                        accessibilityLabel="App Logo"
                        testID="header-app-logo"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export { Header };
