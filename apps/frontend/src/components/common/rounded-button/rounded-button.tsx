import React from "react";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IButtonProps } from "./props";
import { getButtonStyles } from "./styles";
import { DebouncedTouchable } from "./debounced-touchable";

const RoundedButton: React.FC<IButtonProps> = ({
    text,
    onPress,
    size = "medium",
    fullWidth = false,
    type = "primary",
    testID,
    disabled = false,
}) => {
    const theme = useTheme();
    const { buttonContainer, buttonText } = getButtonStyles({
        type,
        size,
        fullWidth,
        disabled,
        theme,
    });

    return (
        <DebouncedTouchable
            style={buttonContainer}
            onPress={onPress}
            disabled={disabled}
            testID={testID}
        >
            <Text style={buttonText}>{text}</Text>
        </DebouncedTouchable>
    );
};

export { RoundedButton };
