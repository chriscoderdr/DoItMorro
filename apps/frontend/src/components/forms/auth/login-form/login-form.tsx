import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store/root-reducer";

import { validators } from "@/utils/validators";
import { getLoginFormStyles } from "./styles";
import { ILoginFormProps } from "./props";
import { InputTextField } from "@/components";
import { DebouncedTouchable, RoundedButton } from "@/components/common";
import { SocialLogin } from "../social-login";
import { ScrollableFormContainer } from "@/components/forms/scrollable-form-container";
import { ThemedText } from "@/components/common";
import { useTheme } from "@react-navigation/native";
import { useRetryCountdown } from "@/hooks/use-retry-countdown";
import { FormattedMessage } from "react-intl";

const LoginForm = ({ loginUser, isLoading, onGoToRegister }: ILoginFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

    const nextAllowedAttempt = useSelector((state: RootState) => state.auth.nextAllowedAttempt);

    const theme = useTheme();
    const styles = getLoginFormStyles({ theme });

    const { countdown, isDisabled } = useRetryCountdown(nextAllowedAttempt);

    const handleLogin = async () => {
        let isValid = true;

        if (!validators.isValidEmail(email)) {
            setEmailError("Please enter a valid email address");
            isValid = false;
        } else {
            setEmailError(undefined);
        }

        if (!validators.isValidPassword(password)) {
            setPasswordError("Password must be at least 8 characters");
            isValid = false;
        } else {
            setPasswordError(undefined);
        }

        if (isValid) {
            // Login action goes here
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        const validation = validators.isValidEmailWithMessage(text);
        setEmailError(validation.valid ? undefined : validation.error);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        const validation = validators.isValidPasswordWithMessage(text);
        setPasswordError(validation.valid ? undefined : validation.error);
    };

    const handleSubmitEditing = () => {
        Keyboard.dismiss();
    };

    const getButtonText = () => {
        if (countdown > 0) {
            return `Try again in ${countdown}s`;
        }
        return isLoading ? "Logging in..." : "Login";
    };

    return (
        <ScrollableFormContainer>
            <View style={styles.container}>
                {/* Creative Title Section */}
                <ThemedText variant="title" align="center" style={styles.title}>
                    <FormattedMessage id="login.title" />
                </ThemedText>
                <ThemedText variant="subtitle" align="center" style={styles.subtitle}>
                    <FormattedMessage id="login.subtitle" />
                </ThemedText>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <InputTextField
                        label="form.email.label"
                        placeholder="form.email.placeholder"
                        fullWidth
                        autoComplete="email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={handleEmailChange}
                        errorText={emailError}
                        testID="email-input"
                        errorTestId="email-input-error"
                    />
                    <InputTextField
                        label="form.password.label"
                        placeholder="form.password.placeholder"
                        fullWidth
                        autoCorrect={false}
                        autoCapitalize="none"
                        onSubmitEditing={handleSubmitEditing}
                        securedEntry
                        onChangeText={handlePasswordChange}
                        errorText={passwordError}
                        testID="password-input"
                        errorTestId="password-input-error"
                    />
                </View>

                {/* Buttons Section */}
                <View style={styles.buttonContainer}>
                    <RoundedButton
                        disabled={isLoading || isDisabled}
                        text={getButtonText()}
                        onPress={handleLogin}
                        testID="login-button"
                    />
                    <View style={styles.socialLoginContainer}>
                        <SocialLogin />
                    </View>
                    <View style={styles.dontHaveAnAccount}>
                        {onGoToRegister && (
                            <DebouncedTouchable onPress={onGoToRegister} debounceDelay={500}>
                                <View>
                                    <ThemedText variant="body" align="center" color="secondaryText">
                                        <FormattedMessage id="login.register.prompt" />{" "}
                                        <ThemedText variant="body" bold color="primary">
                                            <FormattedMessage id="login.register.link" />
                                        </ThemedText>
                                    </ThemedText>
                                </View>
                            </DebouncedTouchable>
                        )}
                    </View>
                </View>
            </View>
        </ScrollableFormContainer>
    );
};

export { LoginForm };
