import React from "react";
import { Keyboard, Platform, TouchableWithoutFeedback, View } from "react-native";

const KeyboardDismiss: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dismissKeyboard = () => {
        if (Platform.OS !== "web") {
            Keyboard.dismiss();
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={dismissKeyboard}
            accessible={false}
            // Prevent unintended behaviors on web
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }}>{children}</View>
        </TouchableWithoutFeedback>
    );
};

export { KeyboardDismiss };
