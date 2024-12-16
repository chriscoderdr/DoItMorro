import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/common";
import { getDatePickerInputStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { useIntl } from "react-intl";
import { IDatePickerInputProps } from "./props";

const DatePickerField: React.FC<IDatePickerInputProps> = ({
    label,
    placeholder,
    selectedDate,
    onOpenCalendar,
    errorText, // Added errorText prop
}) => {
    const theme = useTheme();
    const styles = getDatePickerInputStyles({ theme });
    const intl = useIntl();

    const formattedDate = selectedDate
        ? intl.formatDate(selectedDate, {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : placeholder
          ? intl.formatMessage({ id: placeholder })
          : "";

    return (
        <View style={styles.container}>
            {label && (
                <ThemedText variant="body" color="secondaryOnBackground" style={styles.label}>
                    {intl.formatMessage({ id: label })}
                </ThemedText>
            )}
            <TouchableOpacity style={styles.inputField} onPress={onOpenCalendar}>
                <ThemedText variant="body" color="text" style={styles.inputText}>
                    {formattedDate}
                </ThemedText>
            </TouchableOpacity>
            {errorText && ( // Added errorText rendering
                <ThemedText variant="caption" color="notification">
                    {errorText}
                </ThemedText>
            )}
        </View>
    );
};

export { DatePickerField };
