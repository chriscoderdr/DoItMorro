import React from "react";
import { View, TouchableOpacity, Text, Pressable } from "react-native";
import { ITodoListItemProps } from "./props";
import { ThemedText } from "@/components/common";
import { getTodoListItemStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { useIntl } from "react-intl";

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
            onCompleteToggle(item.id, !item.isCompleted);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(item);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.cardContainer, item.isCompleted && styles.completedCard]}
            onPress={() => onItemPress && onItemPress(item)}
        >
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    {/* Checkbox for inline toggle */}
                    <Pressable
                        style={[styles.checkbox, item.isCompleted && styles.checkboxChecked]}
                        onPress={handleToggleComplete}
                    >
                        {item.isCompleted && <Text style={styles.checkboxMark}>✓</Text>}
                    </Pressable>
                    {/* Title */}
                    <ThemedText
                        variant="body"
                        color={item.isCompleted ? "completedText" : "text"}
                        style={[styles.cardTitle, item.isCompleted && styles.strikethroughText]}
                    >
                        {item.title}
                    </ThemedText>
                </View>
                {/* Description */}
                {item.description && (
                    <ThemedText
                        variant="caption"
                        color="secondaryOnBackground"
                        style={styles.cardDescription}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {item.description}
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
                {/* Completed At */}
                {item.completedAt && (
                    <View style={styles.completedAtContainer}>
                        <Text style={styles.completedAtLabel}>
                            {intl.formatMessage({ id: "todoList.completedAt" })}
                        </Text>
                        <ThemedText
                            variant="caption"
                            color="text"
                            style={styles.completedAtTimestamp}
                        >
                            {intl.formatDate(item.completedAt, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </ThemedText>
                        {/* Completed Badge */}
                        <View style={styles.completedBadge}>
                            <Text style={styles.completedBadgeText}>
                                {intl.formatMessage({ id: "todoList.completed" })}
                            </Text>
                        </View>
                    </View>
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
