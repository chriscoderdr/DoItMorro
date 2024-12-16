import React from "react";
import { View, Text, TouchableOpacity, SectionList } from "react-native";
import { ITodoListProps } from "./props";
import { getTodoListStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { useIntl } from "react-intl";
import { TodoListItem } from "./todo-list-item";
import * as Localization from "expo-localization";
import { parseISO, isSameDay } from "date-fns";
import { toDate } from "date-fns-tz";

const TodoList: React.FC<ITodoListProps> = ({ todos, onItemPress, onAddPress, onDeleteItem }) => {
    const theme = useTheme();
    const styles = getTodoListStyles({ theme });
    const intl = useIntl();
    console.log(`todos: ${JSON.stringify(todos)}`);

    // Get the user's timezone
    const userTimezone = Localization.timezone;

    // Get today's date in the user's timezone
    const now = new Date();
    const today = toDate(now, { timeZone: userTimezone });

    // Filter tasks for today and upcoming
    const todayTasks = todos?.filter((todo) => {
        if (!todo.dueDate) return false;
        const dueDateInUserTimezone = toDate(parseISO(todo.dueDate), { timeZone: userTimezone });
        return isSameDay(today, dueDateInUserTimezone) || [];
    });

    const upcomingTasks = todos?.filter((todo) => {
        if (!todo.dueDate) return true;
        const dueDateInUserTimezone = toDate(parseISO(todo.dueDate), { timeZone: userTimezone });
        return !isSameDay(today, dueDateInUserTimezone) || [];
    });

    // Prepare sections
    const sections = [
        ...(todayTasks.length
            ? [
                  {
                      title: intl.formatMessage({ id: "todoList.todayTitle" }),
                      data: todayTasks,
                  },
              ]
            : []),
        ...(upcomingTasks.length
            ? [
                  {
                      title: intl.formatMessage({ id: "todoList.upcomingTitle" }),
                      data: upcomingTasks,
                  },
              ]
            : []),
    ];

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                renderItem={({ item }) => (
                    <TodoListItem
                        item={item}
                        onItemPress={onItemPress}
                        onCompleteToggle={(id, isCompleted) =>
                            item.onComplete && item.onComplete(id, isCompleted)
                        }
                        onDelete={onDeleteItem}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyStateContainer}>
                        <Text style={styles.emptyEmoji}>🎉</Text>
                        <Text style={styles.emptyMessage}>
                            {intl.formatMessage({ id: "todoList.emptyMessage" })}
                        </Text>
                    </View>
                }
            />
            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={onAddPress}
                testID="add-todo-button"
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export { TodoList };
