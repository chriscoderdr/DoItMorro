import React, { useEffect, useState } from "react";
import { Keyboard, View, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemedText, RoundedButton } from "@/components/common";
import { InputTextField } from "@/components";
import { ScrollableFormContainer } from "@/components/forms/scrollable-form-container";
import { DebouncedTouchable } from "@/components/common";
import { FormattedMessage } from "react-intl";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store/root-reducer";
import { signUpFormActions } from "@/state/forms/sign-up-form/actions";
import { signUpAsyncThunk } from "@/state/forms/sign-up-form/thunks";
import { getSignUpFormStyles } from "./styles";
import { useRouter } from "expo-router";

const SignUpForm: React.FC<{ onGoToLogin?: () => void }> = ({ onGoToLogin }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {
        email,
        password,
        displayName,
        emailError,
        passwordError,
        displayNameError,
        isLoading,
        nextAllowedAttempt,
        error,
    } = useSelector((state: RootState) => state.signUpForm);

    const theme = useTheme();
    const styles = getSignUpFormStyles({ theme });

    const [countdown, setCountdown] = useState<number>(
        Math.max(0, Math.ceil((nextAllowedAttempt - Date.now()) / 1000)),
    );
    const [privacyChecked, setPrivacyChecked] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = Math.max(0, Math.ceil((nextAllowedAttempt - Date.now()) / 1000));
            setCountdown(remaining);
        }, 1000);

        return () => clearInterval(interval);
    }, [nextAllowedAttempt]);

    const isFormValid =
        !emailError &&
        !passwordError &&
        !displayNameError &&
        email &&
        password &&
        displayName &&
        privacyChecked;

    const isDisabled = isLoading || countdown > 0 || !isFormValid;

    const handleEmailChange = (text: string) => {
        dispatch(signUpFormActions.setEmailAction(text));
    };

    const handlePasswordChange = (text: string) => {
        dispatch(signUpFormActions.setPasswordAction(text));
    };

    const handleDisplayNameChange = (text: string) => {
        dispatch(signUpFormActions.setDisplayNameAction(text));
    };

    const handleSignUp = async () => {
        if (isFormValid) {
            dispatch(signUpAsyncThunk({ email, password, displayName }));
        } else {
            Alert.alert(
                "Form Error",
                "Please fill in all required fields and accept the Privacy Policy.",
            );
        }
    };

    const handleSubmitEditing = () => {
        Keyboard.dismiss();
    };

    const handlePrivacyPolicyPress = () => {
        // Navigate to the Privacy Policy page
        router.push("/privacy");
    };

    const getButtonText = () => {
        if (countdown > 0) {
            return `Retry in ${countdown} seconds`;
        }
        return isLoading ? "Signing up..." : "Sign Up";
    };

    return (
        <ScrollableFormContainer>
            <View style={styles.container}>
                <ThemedText variant="title" align="center" style={styles.title}>
                    Sign Up
                </ThemedText>
                <View style={styles.inputContainer}>
                    <InputTextField
                        label="form.displayName.label"
                        placeholder="form.displayName.placeholder"
                        fullWidth
                        onChangeText={handleDisplayNameChange}
                        errorText={displayNameError}
                        testID="display-name-input"
                        value={displayName}
                    />
                    <InputTextField
                        label="form.email.label"
                        placeholder="form.email.placeholder"
                        fullWidth
                        onChangeText={handleEmailChange}
                        errorText={emailError}
                        testID="email-input"
                        value={email}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <InputTextField
                        label="form.password.label"
                        placeholder="form.password.placeholder"
                        fullWidth
                        securedEntry
                        onChangeText={handlePasswordChange}
                        errorText={passwordError}
                        testID="password-input"
                        value={password}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </View>

                {/* Privacy Policy Checkbox */}
                <View style={styles.privacyContainer}>
                    <TouchableOpacity
                        onPress={() => setPrivacyChecked(!privacyChecked)}
                        style={styles.checkbox}
                    >
                        <View
                            style={[
                                styles.checkboxInner,
                                privacyChecked && { backgroundColor: theme.colors.primary },
                            ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePrivacyPolicyPress}>
                        <ThemedText style={styles.privacyText} variant="body" color="primary">
                            I agree to the Privacy Policy
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <RoundedButton
                        disabled={isDisabled}
                        text={getButtonText()}
                        onPress={handleSignUp}
                        testID="sign-up-button"
                    />
                    {error && (
                        <ThemedText variant="caption" color="notification" align="center">
                            <FormattedMessage id={error} />
                        </ThemedText>
                    )}
                    {onGoToLogin && (
                        <DebouncedTouchable onPress={onGoToLogin} debounceDelay={500}>
                            <View style={styles.switchToLogin}>
                                <ThemedText variant="body" align="center" color="secondaryText">
                                    <FormattedMessage id="signup.action.goToLogin" />{" "}
                                    <ThemedText variant="body" bold color="primary">
                                        Log In
                                    </ThemedText>
                                </ThemedText>
                            </View>
                        </DebouncedTouchable>
                    )}
                </View>
            </View>
        </ScrollableFormContainer>
    );
};

export { SignUpForm };
