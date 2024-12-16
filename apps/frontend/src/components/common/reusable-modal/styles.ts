import { StyleSheet, Platform } from "react-native";
import { Theme } from "@react-navigation/native";

interface ReusableModalStylesParams {
    theme: Theme & {
        colors: {
            background: string;
            shadowColor: string;
        };
    };
}

const getReusableModalStyles = ({ theme }: ReusableModalStylesParams) =>
    StyleSheet.create({
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            ...(Platform.OS === "web" && { position: "fixed" }),
        },
        modalContent: {
            width: "90%", // Flexible width
            maxWidth: 400, // Constrain the width for large screens
            backgroundColor: theme.colors.background,
            borderRadius: 12,
            padding: 20,
            shadowColor: theme.colors.shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            alignSelf: "center", // Ensure the modal content is centered
        },
    });

export { getReusableModalStyles };
