import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getReusableModalStyles } from "./styles";
import { IReusableModalProps } from "./props";

const ReusableModal: React.FC<IReusableModalProps> = ({ visible, onClose, children }) => {
    const theme = useTheme();
    const styles = getReusableModalStyles({ theme });

    if (!visible) return null;

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.modalContent}>{children}</View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
};

export { ReusableModal };
