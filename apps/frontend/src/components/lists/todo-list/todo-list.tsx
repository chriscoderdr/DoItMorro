import React from "react";
import { View, Text, SectionList } from "react-native";
import { ITodoItem, ITodoListProps } from "./props";
import { getTodoListStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { useIntl } from "react-intl";
import { TodoListItem } from "./todo-list-item";
import * as Localization from "expo-localization";
import { parseISO, isBefore, isSameDay } from "date-fns";
import { toDate } from "date-fns-tz";

const TodoList: React.FC<ITodoListProps> = ({
    todos,
    onItemPress,
    onAddPress,
    onDeleteItem,
    onComplete,
}) => {
    const theme = useTheme();
    const styles = getTodoListStyles({ theme });
    const intl = useIntl();

    // Get the user's timezone
    const userTimezone = Localization.timezone;

    // Get today's date in the user's timezone
    const now = new Date();
    const today = toDate(now, { timeZone: userTimezone });

    const pastDueTasks: ITodoItem[] = [];
    const todayTasks: ITodoItem[] = [];
    const upcomingTasks: ITodoItem[] = [];

    todos?.forEach((todo) => {
        const dueDateInUserTimezone = todo.dueDate
            ? toDate(parseISO(todo.dueDate), { timeZone: userTimezone })
            : null;

        if (dueDateInUserTimezone) {
            if (
                isBefore(dueDateInUserTimezone, today) &&
                !isSameDay(today, dueDateInUserTimezone)
            ) {
                pastDueTasks.push(todo);
            } else if (isSameDay(today, dueDateInUserTimezone)) {
                todayTasks.push(todo);
            } else {
                upcomingTasks.push(todo);
            }
        }
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
        ...(pastDueTasks.length
            ? [
                  {
                      title: intl.formatMessage({ id: "todoList.pastDueTitle" }),
                      data: pastDueTasks,
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
                        onCompleteToggle={onComplete}
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
        </View>
    );
};

export { TodoList };
