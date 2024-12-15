import React, { forwardRef } from "react";
import { View } from "react-native";
import { IInputTextFieldProps } from "./props";
import { ObscuredInputText } from "./obscured-input-text";
import { InputText } from "./input-text";
import { ThemedText } from "@/components/common";
import { getInputTextFieldStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { useIntl } from "react-intl";

const InputTextField = forwardRef<any, IInputTextFieldProps>(
    (
        {
            label,
            placeholder,
            IconComponent,
            onIconPress,
            fullWidth = false,
            securedEntry = false,
            errorText,
            errorTestId,
            ...inputProps
        },
        ref,
    ) => {
        const theme = useTheme();
        const styles = getInputTextFieldStyles({ theme });
        const intl = useIntl();

        return (
            <View style={[styles.container, fullWidth ? { alignSelf: "stretch" } : {}]}>
                {/* Localized label */}
                {label && (
                    <ThemedText variant="body" color="secondaryOnBackground" style={styles.label}>
                        {intl.formatMessage({ id: label })}
                    </ThemedText>
                )}
                {securedEntry ? (
                    <ObscuredInputText
                        fullWidth={fullWidth}
                        placeholder={
                            placeholder ? intl.formatMessage({ id: placeholder }) : undefined
                        }
                        {...inputProps}
                    />
                ) : (
                    <InputText
                        IconComponent={IconComponent}
                        onIconPress={onIconPress}
                        fullWidth={fullWidth}
                        placeholder={
                            placeholder ? intl.formatMessage({ id: placeholder }) : undefined
                        }
                        {...inputProps}
                    />
                )}
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

InputTextField.displayName = "InputTextField";

export default InputTextField;
