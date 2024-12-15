import React, { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store/root-reducer";
import { loginFormActions } from "@/state/forms/login-form/actions";
import { loginAsyncThunk } from "@/state/forms/login-form/thunks";

import { getLoginFormStyles } from "./styles";
import { ILoginFormProps } from "./props";
import { InputTextField } from "@/components";
import { DebouncedTouchable, RoundedButton } from "@/components/common";
import { SocialLogin } from "../social-login";
import { ScrollableFormContainer } from "@/components/forms/scrollable-form-container";
import { ThemedText } from "@/components/common";
import { useTheme } from "@react-navigation/native";
import { FormattedMessage, useIntl } from "react-intl";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

const LoginForm = ({ onGoToRegister }: ILoginFormProps) => {
    const dispatch = useAppDispatch();
    const { email, password, emailError, passwordError, isLoading, nextAllowedAttempt, error } =
        useSelector((state: RootState) => state.loginForm);

    const theme = useTheme();
    const styles = getLoginFormStyles({ theme });
    const intl = useIntl();

    // Countdown state for dynamic updates
    const [countdown, setCountdown] = useState<number>(
        Math.max(0, Math.ceil((nextAllowedAttempt - Date.now()) / 1000)),
    );

    // Update the countdown every second
    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = Math.max(0, Math.ceil((nextAllowedAttempt - Date.now()) / 1000));
            setCountdown(remaining);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [nextAllowedAttempt]);

    const isDisabled = isLoading || countdown > 0;

    const handleEmailChange = (text: string) => {
        dispatch(loginFormActions.setEmailAction(text));
    };

    const handlePasswordChange = (text: string) => {
        dispatch(loginFormActions.setPasswordAction(text));
    };

    const handleLogin = async () => {
        if (!emailError && !passwordError) {
            dispatch(loginAsyncThunk({ email, password }));
        }
    };

    const getButtonText = () => {
        if (countdown > 0) {
            return intl.formatMessage({ id: "login.retry-countdown" }, { seconds: countdown });
        }
        return isLoading
            ? intl.formatMessage({ id: "login.buttton.inProgress" })
            : intl.formatMessage({ id: "login.button" });
    };

    const handleSubmitEditing = () => {
        Keyboard.dismiss();
    };

    return (
        <ScrollableFormContainer>
            <View style={styles.container}>
                {/* Title Section */}
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
                        disabled={isDisabled}
                        text={getButtonText()}
                        onPress={handleLogin}
                        testID="login-button"
                    />
                    {error && (
                        <ThemedText variant="caption" color="notification" align="center">
                            <FormattedMessage id={error} />
                        </ThemedText>
                    )}
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
