import React, { forwardRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IInputTextProps } from "./props";
import { getInputTextStyles } from "./styles";

const InputText = forwardRef<TextInput, IInputTextProps>(
    ({ IconComponent, onIconPress, fullWidth = false, ...textInputProps }, ref) => {
        const theme = useTheme();
        const [isFocused, setIsFocused] = useState(false);

        const { container, input, inputFocus, iconContainer } = getInputTextStyles({
            fullWidth,
            theme,
        });

        return (
            <View style={[container, isFocused && inputFocus]}>
                <TextInput
                    style={input}
                    placeholderTextColor={theme.colors.secondaryOnBackground}
                    ref={ref}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...textInputProps}
                />
                {IconComponent && (
                    <TouchableOpacity onPress={onIconPress} style={iconContainer}>
                        {IconComponent}
                    </TouchableOpacity>
                )}
            </View>
        );
    },
);

InputText.displayName = "InputText";

export { InputText };
