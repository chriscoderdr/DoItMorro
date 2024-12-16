import React, { useEffect, useState } from "react";
import { TodoList } from "@/components/lists/todo-list";
import { useGetTodosQuery, useDeleteTodoMutation } from "@/state/api/slices/todo-api-slice";
import { ActivityIndicator, View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { FormattedMessage, useIntl } from "react-intl";
import { ThemedText } from "@/components/common";
import { SafeAreaView } from "react-native-safe-area-context";
import { ITodoItem } from "@/components/lists/todo-list/props";
import { useRouter } from "expo-router";
import { ConfirmationModal } from "@/components/common/confirmation-modal/confirmation-modal";

const TodoListScreen = () => {
    const theme = useTheme();
    const isFocused = useIsFocused();
    const router = useRouter();
    const intl = useIntl();

    const {
        data: todos = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useGetTodosQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
    const [selectedTodo, setSelectedTodo] = useState<ITodoItem | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [isFocused, refetch]);

    const handleTodoPress = (todo: ITodoItem) => {
        console.log("Todo clicked:", todo);
        router.push({
            pathname: "/todos/edit/[todoId]",
            params: {
                todoId: todo.id,
            },
        });
    };

    const handleAddPress = () => {
        router.push("/todos/add");
    };

    const handleOnDeleteItem = (item: ITodoItem) => {
        setSelectedTodo(item);
        setModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedTodo) return;

        try {
            await deleteTodo(selectedTodo.id).unwrap();
            console.log(
                intl.formatMessage(
                    { id: "todoList.delete.success" },
                    { title: selectedTodo.title },
                ),
            );
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

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.colors.background,
                }}
            >
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (isError) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.colors.background,
                    }}
                >
                    <Text style={{ color: theme.colors.notification }}>
                        {error?.data?.message || intl.formatMessage({ id: "todoList.fetch.error" })}
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ padding: theme.spacing.medium }}>
                    <ThemedText
                        variant="title"
                        color="text"
                        style={{
                            fontSize: theme.fonts.sizes.large.fontSize,
                            fontFamily: theme.fonts.bold.fontFamily,
                        }}
                    >
                        <FormattedMessage id="todoList.title" />
                    </ThemedText>
                </View>
                <View style={{ flex: 1 }}>
                    <TodoList
                        todos={todos as ITodoItem[]}
                        onItemPress={handleTodoPress}
                        onAddPress={handleAddPress}
                        onDeleteItem={handleOnDeleteItem}
                        isDeleting={isDeleting}
                    />
                </View>
            </View>

            {/* Confirmation Modal */}
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

            {/* Error Modal */}
            <ConfirmationModal
                visible={errorModalVisible}
                title={intl.formatMessage({ id: "todoList.error.title" })}
                message={errorMessage}
                confirmText={intl.formatMessage({ id: "todoList.error.confirmText" })}
                onConfirm={handleAcknowledgeError}
            />
        </SafeAreaView>
    );
};

export default TodoListScreen;
