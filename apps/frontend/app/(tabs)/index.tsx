import React, { useEffect } from "react";
import { TodoList } from "@/components/lists/todo-list";
import { useGetTodosQuery } from "@/state/api/slices/todo-api-slice";
import { ActivityIndicator, View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import { ThemedText } from "@/components/common";
import { SafeAreaView } from "react-native-safe-area-context";
import { ITodoItem } from "@/components/lists/todo-list/props";
import { useRouter } from "expo-router";

const TodoListScreen = () => {
    const theme = useTheme();
    const isFocused = useIsFocused();
    const router = useRouter();
    const {
        data: todos = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useGetTodosQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [isFocused, refetch]);

    const handleTodoPress = (todo: any) => {
        console.log("Todo clicked:", todo);
    };

    const handleAddPress = () => {
        router.push("/todos/add");
    };

    const handleOnDeleteItem = (item: ITodoItem) => {
        console.log("item delete");
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
                        {error?.data?.message || "An error occurred while fetching todos."}
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
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TodoListScreen;
