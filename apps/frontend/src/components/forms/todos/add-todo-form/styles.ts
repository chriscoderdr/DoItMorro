import { StyleSheet } from "react-native";

export const getAddTodoFormStyles = ({ theme }: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: theme.spacing.large,
            paddingVertical: theme.spacing.medium,
        },
        title: {
            marginBottom: theme.spacing.small,
        },
        subtitle: {
            marginBottom: theme.spacing.medium,
        },
        inputContainer: {
            gap: theme.spacing.medium,
        },
        buttonContainer: {
            marginTop: theme.spacing.large,
        },
        modalOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000, // Ensure it floats above all elements
        },
        datePickerContainer: {
            marginBottom: theme.spacing.medium,
        },
        datePickerLabel: {
            fontSize: 14,
            color: theme.colors.text,
            marginBottom: 4,
        },
        datePickerInput: {
            padding: 12,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 8,
            backgroundColor: theme.colors.background,
        },
        datePickerText: {
            fontSize: 16,
            color: theme.colors.text,
        },
    });
