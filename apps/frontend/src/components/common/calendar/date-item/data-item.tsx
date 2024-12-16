import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "../../themed-text";
import { useTheme } from "@react-navigation/native";
import { getDateItemStyles } from "./styles";
import { IDateItemProps } from "./props";

const DateItem: React.FC<IDateItemProps> = ({ day, isCurrentDay, isDisabled, onSelect }) => {
    const theme = useTheme();
    const styles = getDateItemStyles(theme);

    return (
        <TouchableOpacity
            style={[
                styles.day,
                isDisabled && styles.disabledDay,
                isCurrentDay && styles.currentDay,
            ]}
            onPress={onSelect}
            disabled={isDisabled}
            activeOpacity={0.7}
        >
            <ThemedText
                variant="body"
                style={[
                    styles.dayText,
                    isDisabled && styles.disabledDayText,
                    isCurrentDay && styles.currentDayText,
                ]}
            >
                {day}
            </ThemedText>
        </TouchableOpacity>
    );
};

export { DateItem };
