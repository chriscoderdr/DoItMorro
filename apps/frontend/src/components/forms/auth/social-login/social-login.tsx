import React from "react";
import { View, Image } from "react-native";
import { useGoogleSignIn } from "@/hooks/use-google-signin";
import { useFacebookSignIn } from "@/hooks/use-facebook-signin";
import { useTheme } from "@react-navigation/native";
import { getSocialLoginStyles } from "./styles";
import { ThemedText } from "@/components/common";
import { DebouncedTouchable } from "@/components/common";
import { FormattedMessage } from "react-intl";

const SocialLogin: React.FC = () => {
    const theme = useTheme();
    const styles = getSocialLoginStyles({ theme });

    const handleGoogleSignInSuccess = (idToken: string) => {
        console.log("Google Sign-In successful:", idToken);
    };

    const handleFacebookSignInSuccess = (accessToken: string) => {
        console.log("Facebook Sign-In successful:", accessToken);
    };

    const handleSignInError = (error: Error) => {
        console.error("Sign-In Error:", error);
    };

    const { signIn: signInWithGoogle } = useGoogleSignIn(
        handleGoogleSignInSuccess,
        handleSignInError,
    );
    const { signIn: signInWithFacebook } = useFacebookSignIn(
        handleFacebookSignInSuccess,
        handleSignInError,
    );

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
                    onPress={signInWithGoogle}
                    debounceDelay={500}
                >
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" }}
                        style={styles.icon}
                    />
                </DebouncedTouchable>
                <DebouncedTouchable
                    style={styles.button}
                    onPress={signInWithFacebook}
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
