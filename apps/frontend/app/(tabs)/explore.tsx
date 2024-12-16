import React, { useEffect } from "react";
import { TodoList } from "@/components/lists/todo-list";
import { useGetTodosQuery } from "@/state/api/slices/todo-api-slice";
import { ActivityIndicator, View, Text, SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import { ThemedText } from "@/components/common";

const ExampleScreen = () => {
    const theme = useTheme();
    const isFocused = useIsFocused();
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
        console.log("Add new task");
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
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
            <TodoList todos={todos} onItemPress={handleTodoPress} onAddPress={handleAddPress} />
        </SafeAreaView>
    );
};

export default ExampleScreen;
