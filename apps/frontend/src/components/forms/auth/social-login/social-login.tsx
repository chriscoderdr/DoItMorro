import React, { useEffect } from "react";
import { View, Image } from "react-native";
import {
    signInWithGoogle,
    signInWithFacebook,
    configureGoogleSignIn,
} from "@/services/auth-service";
import { useTheme } from "@react-navigation/native";
import { getSocialLoginStyles } from "./styles";
import { ThemedText } from "@/components/common";
import { DebouncedTouchable } from "@/components/common";
import { FormattedMessage } from "react-intl";

const SocialLogin: React.FC = () => {
    const theme = useTheme();
    const styles = getSocialLoginStyles({ theme });

    useEffect(() => {
        configureGoogleSignIn();
    }, []);

    const handleLogin = async (provider: "Google" | "Facebook") => {
        try {
            if (provider === "Google") {
                await signInWithGoogle();
            } else if (provider === "Facebook") {
                await signInWithFacebook();
            }
        } catch (error) {
            console.error(`Error authenticating with ${provider}:`, error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <ThemedText
                    variant="caption"
                    color="secondaryOnBackground"
                    style={styles.dividerText}
                >
                    <FormattedMessage id="login.social.label" />
                </ThemedText>
                <View style={styles.line} />
            </View>
            <View style={styles.buttonContainer}>
                <DebouncedTouchable
                    style={styles.button}
                    onPress={() => handleLogin("Google")}
                    debounceDelay={500}
                >
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" }}
                        style={styles.icon}
                    />
                </DebouncedTouchable>
                <DebouncedTouchable
                    style={styles.button}
                    onPress={() => handleLogin("Facebook")}
                    debounceDelay={500}
                >
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/124/124010.png" }}
                        style={styles.icon}
                    />
                </DebouncedTouchable>
            </View>
        </View>
    );
};

export default SocialLogin;
