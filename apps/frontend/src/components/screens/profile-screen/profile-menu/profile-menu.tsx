import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProfileHeader } from "./profile-header";
import { getProfileMenuStyles } from "./styles";
import { useTheme } from "@react-navigation/native";

interface ProfileMenuProps {
    options: Array<any>;
    onItemPress: (item: any) => void;
    profilePhoto?: string | null;
    displayName?: string;
    email?: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
    options,
    onItemPress,
    profilePhoto,
    displayName,
    email,
}) => {
    const theme = useTheme();
    const styles = getProfileMenuStyles({ theme });

    const renderItem = ({ item }: { item: any }) => {
        if (item.type === "header") {
            return (
                <ProfileHeader
                    profilePhoto={profilePhoto}
                    displayName={displayName}
                    email={email}
                />
            );
        }

        if (item.type === "section") {
            return <Text style={styles.sectionHeader}>{item.label}</Text>;
        }

        if (item.connected) {
            return (
                <View style={[styles.menuItem, styles.connectedItem]}>
                    <Ionicons
                        name={item.icon}
                        size={24}
                        color={theme.colors.success}
                        style={styles.menuIcon}
                    />
                    <Text style={[styles.menuText, { color: theme.colors.success }]}>
                        Connected to {item.label.split(" ")[2]}
                    </Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                style={[styles.menuItem, styles.touchableItem]}
                onPress={() => onItemPress(item)}
                activeOpacity={0.8}
            >
                <Ionicons
                    name={item.icon}
                    size={24}
                    color={theme.colors.primary}
                    style={styles.menuIcon}
                />
                <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={options}
            keyExtractor={(item) => item.id || item.label}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
    );
};

export { ProfileMenu };
