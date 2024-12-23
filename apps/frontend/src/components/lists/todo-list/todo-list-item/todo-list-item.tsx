import React from "react";
import { View, TouchableOpacity, Text, Pressable } from "react-native";
import { ITodoListItemProps } from "./props";
import { ThemedText } from "@/components/common";
import { getTodoListItemStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { useIntl } from "react-intl";
import { isPast, isToday } from "date-fns";

const TodoListItem: React.FC<ITodoListItemProps> = ({
    item,
    onItemPress,
    onCompleteToggle,
    onDelete,
}) => {
    const theme = useTheme();
    const styles = getTodoListItemStyles({ theme });
    const intl = useIntl();

    const handleToggleComplete = () => {
        if (onCompleteToggle) {
            onCompleteToggle(item);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(item);
        }
    };

    // Check if the task is past due, excluding today's tasks
    const isPastDue =
        item.dueDate && !item.isCompleted
            ? isPast(new Date(item.dueDate)) && !isToday(new Date(item.dueDate))
            : false;

    return (
        <TouchableOpacity
            style={[
                styles.cardContainer,
                item.isCompleted && styles.completedCard,
                isPastDue && styles.pastDueCard,
            ]}
            onPress={() => onItemPress && onItemPress(item)}
        >
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    {/* Checkbox for inline toggle */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.checkboxWrapper,
                            pressed && styles.checkboxPressed,
                        ]}
                        onPress={handleToggleComplete}
                    >
                        <View style={[styles.checkbox, item.isCompleted && styles.checkboxChecked]}>
                            {item.isCompleted && <Text style={styles.checkboxMark}>✓</Text>}
                        </View>
                    </Pressable>
                    {/* Title */}
                    <ThemedText
                        variant="body"
                        color={
                            isPastDue ? "notification" : item.isCompleted ? "completedText" : "text"
                        }
                        style={[styles.cardTitle, item.isCompleted && styles.strikethroughText]}
                    >
                        {item.title}
                    </ThemedText>
                </View>
                {/* Past Due Text */}
                {isPastDue && (
                    <ThemedText variant="caption" color="notification" style={styles.pastDueText}>
                        {intl.formatMessage(
                            { id: "todoList.pastDueMessage" },
                            { date: intl.formatDate(item.dueDate) },
                        )}
                    </ThemedText>
                )}
                {/* Due Date */}
                {item.dueDate && (
                    <ThemedText variant="caption" color="notification" style={styles.dueDate}>
                        {intl.formatDate(item.dueDate, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </ThemedText>
                )}
                {/* Delete Button */}
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>
                        {intl.formatMessage({ id: "todoList.delete" })}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export { TodoListItem };
