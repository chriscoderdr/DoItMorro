import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { getProfileHeaderStyles } from "./styles";

interface ProfileHeaderProps {
    profilePhoto?: string | null;
    displayName?: string;
    email?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    profilePhoto,
    displayName = "Guest",
    email = "No email available",
}) => {
    const theme = useTheme();
    const styles = getProfileHeaderStyles({ theme });

    return (
        <View style={styles.profileContainer}>
            <View style={styles.profileInfo}>
                {profilePhoto ? (
                    <Image source={{ uri: profilePhoto }} style={styles.profilePicture} />
                ) : (
                    <Ionicons
                        name="person-circle-outline"
                        size={60}
                        color={theme.colors.secondaryOnBackground}
                    />
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.profileName}>{displayName}</Text>
                    <Text style={styles.profileEmail}>{email}</Text>
                </View>
            </View>
        </View>
    );
};

export { ProfileHeader };
