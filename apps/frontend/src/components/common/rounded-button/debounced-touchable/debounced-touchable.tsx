import React, { ReactNode, useCallback } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import useDebouncedCallback from "@/hooks/use-debounced-callback";

interface IDebouncedTouchableProps extends TouchableOpacityProps {
    onPress?: () => void;
    debounceDelay?: number;
    children: ReactNode;
}

const DebouncedTouchable: React.FC<IDebouncedTouchableProps> = ({
    onPress,
    debounceDelay = 500,
    children,
    ...props
}) => {
    const debouncedOnPress = useDebouncedCallback(() => {
        onPress?.();
    }, debounceDelay);

    const handleOnPress = useCallback(() => {
        debouncedOnPress();
    }, [debouncedOnPress]);

    return (
        <TouchableOpacity onPress={handleOnPress} {...props}>
            {children}
        </TouchableOpacity>
    );
};

export { DebouncedTouchable };
