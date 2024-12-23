import React, { useState } from "react";
import { ScrollView, RefreshControl, TouchableOpacity, Text, StyleSheet } from "react-native";
import { TodoList } from "@/components/lists/todo-list";
import {
    useGetTodosQuery,
    useDeleteTodoMutation,
    useMarkTodoCompleteMutation,
} from "@/state/api/slices/todo-api-slice";
import { useTheme } from "@react-navigation/native";
import { FormattedMessage, useIntl } from "react-intl";
import { ThemedText } from "@/components/common";
import { ITodoItem } from "@/components/lists/todo-list/props";
import { useRouter } from "expo-router";
import { ConfirmationModal } from "@/components/common/confirmation-modal/confirmation-modal";
import { withLoadingAndError } from "@/hocs/with-loading-and-errors";

const TodoListContent: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const intl = useIntl();

    const {
        data: todos = [],
        isLoading,
        isFetching,
        refetch,
    } = useGetTodosQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [deleteTodo] = useDeleteTodoMutation();
    const [markTodoComplete] = useMarkTodoCompleteMutation();

    const [selectedTodo, setSelectedTodo] = useState<ITodoItem | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Navigate to the Todo Edit screen
    const handleTodoPress = (todo: ITodoItem) => {
        router.push({ pathname: "/todos/edit/[todoId]", params: { todoId: todo.id } });
    };

    // Navigate to the Todo Add screen
    const handleAddPress = () => router.push("/todos/add");

    // Handle delete confirmation modal
    const handleOnDeleteItem = (item: ITodoItem) => {
        setSelectedTodo(item);
        setModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedTodo) return;
        try {
            await deleteTodo(selectedTodo.id).unwrap();
            refetch(); // Refresh the list after deletion
        } catch (err) {
            console.error("Failed to delete todo:", err);
            setErrorMessage(intl.formatMessage({ id: "todoList.delete.error" }));
            setErrorModalVisible(true);
        } finally {
            setModalVisible(false);
            setSelectedTodo(null);
        }
    };

    const handleCancelDelete = () => {
        setModalVisible(false);
        setSelectedTodo(null);
    };

    const handleAcknowledgeError = () => {
        setErrorModalVisible(false);
        setErrorMessage("");
    };

    // Handle marking a Todo as complete
    const handleOnComplete = async (todo: ITodoItem) => {
        try {
            await markTodoComplete(todo.id).unwrap();
            refetch(); // Refresh the list after marking the todo as complete
        } catch (err) {
            console.error("Failed to mark todo as complete:", err);
            setErrorMessage(
                intl.formatMessage({ id: "todoList.complete.error" }, { title: todo.title }),
            );
            setErrorModalVisible(true);
        }
    };

    // Handle pull-to-refresh
    const handleRetry = async () => {
        try {
            await refetch();
        } catch (err) {
            console.error("Error during retry:", err);
        }
    };

    return (
        <>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading || isFetching}
                        onRefresh={handleRetry}
                        tintColor={theme.colors.primary}
                    />
                }
            >
                <ThemedText
                    variant="title"
                    color="text"
                    style={{
                        fontSize: theme.fonts.sizes.large.fontSize,
                        fontFamily: theme.fonts.bold.fontFamily,
                        padding: theme.spacing.medium,
                    }}
                >
                    <FormattedMessage id="todoList.title" />
                </ThemedText>
                <TodoList
                    todos={todos as ITodoItem[]}
                    onItemPress={handleTodoPress}
                    onAddPress={handleAddPress}
                    onDeleteItem={handleOnDeleteItem}
                    onComplete={handleOnComplete}
                />
                <ConfirmationModal
                    visible={isModalVisible}
                    title={intl.formatMessage({ id: "todoList.delete.title" })}
                    message={intl.formatMessage(
                        { id: "todoList.delete.message" },
                        { title: selectedTodo?.title },
                    )}
                    confirmText={intl.formatMessage({ id: "todoList.delete.confirmText" })}
                    cancelText={intl.formatMessage({ id: "todoList.delete.cancelText" })}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
                <ConfirmationModal
                    visible={errorModalVisible}
                    title={intl.formatMessage({ id: "todoList.error.title" })}
                    message={errorMessage}
                    confirmText={intl.formatMessage({ id: "todoList.error.confirmText" })}
                    onConfirm={handleAcknowledgeError}
                />
            </ScrollView>
            <TouchableOpacity
                style={[styles.floatingButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleAddPress}
                testID="add-todo-button"
            >
                <Text style={[styles.floatingButtonText, { color: theme.colors.onPrimary }]}>
                    +
                </Text>
            </TouchableOpacity>
        </>
    );
};

const EnhancedTodoListScreen = withLoadingAndError(TodoListContent);

export const TodoListScreen: React.FC = () => {
    const { isLoading, isError, refetch } = useGetTodosQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    return <EnhancedTodoListScreen isLoading={isLoading} isError={isError} refetch={refetch} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    floatingButton: {
        position: "absolute",
        bottom: 32,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        elevation: 6, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 10, // Keep it on top
    },
    floatingButtonText: {
        fontSize: 32,
        fontWeight: "bold",
    },
});
