import React, { forwardRef, useState } from "react";
import { View, TextInput } from "react-native";
import { ThemedText } from "@/components/common";
import { useTheme } from "@react-navigation/native";
import { getInputTextAreaFieldStyles } from "./styles";
import { useIntl } from "react-intl";
import { IInputTextAreaFieldProps } from "./props";

const InputTextAreaField = forwardRef<any, IInputTextAreaFieldProps>(
    (
        {
            label,
            placeholder,
            fullWidth = false,
            errorText,
            errorTestId,
            minCharacters,
            maxCharacters,
            onChangeText,
            ...inputProps
        },
        ref,
    ) => {
        const theme = useTheme();
        const styles = getInputTextAreaFieldStyles({ theme });
        const intl = useIntl();

        const [text, setText] = useState<string>("");
        const [isFocused, setIsFocused] = useState<boolean>(false);

        const handleChange = (input: string) => {
            let newText = input;

            if (maxCharacters && input.length > maxCharacters) {
                newText = input.slice(0, maxCharacters);
            }

            setText(newText);
            onChangeText?.(newText);
        };

        const characterCount = text.length;
        const isMinMet = !minCharacters || characterCount >= minCharacters;

        return (
            <View style={[styles.container, fullWidth ? { alignSelf: "stretch" } : {}]}>
                {/* Localized label */}
                {label && (
                    <ThemedText variant="body" color="secondaryOnBackground" style={styles.label}>
                        {intl.formatMessage({ id: label })}
                    </ThemedText>
                )}

                {/* Multiline Input */}
                <TextInput
                    ref={ref}
                    style={[
                        styles.textArea,
                        fullWidth ? { width: "100%" } : {},
                        isFocused && styles.textAreaFocused, // Apply focused border style
                    ]}
                    placeholder={placeholder ? intl.formatMessage({ id: placeholder }) : undefined}
                    placeholderTextColor={theme.colors.secondaryOnBackground}
                    multiline
                    value={text}
                    onChangeText={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...inputProps}
                />

                {/* Character Feedback */}
                <View style={styles.characterFeedbackContainer}>
                    <ThemedText
                        variant="caption"
                        style={[
                            styles.characterFeedbackText,
                            !isMinMet && { color: theme.colors.notification },
                        ]}
                    >
                        {maxCharacters
                            ? `${characterCount} / ${maxCharacters}`
                            : `${characterCount} ${minCharacters ? `/ ${minCharacters} min` : ""}`}
                    </ThemedText>
                </View>

                {/* Error Text */}
                {errorText && (
                    <ThemedText
                        variant="caption"
                        color="notification"
                        style={styles.errorText}
                        testID={errorTestId}
                    >
                        {intl.formatMessage({ id: errorText })}
                    </ThemedText>
                )}
            </View>
        );
    },
);

InputTextAreaField.displayName = "InputTextAreaField";

export { InputTextAreaField };
