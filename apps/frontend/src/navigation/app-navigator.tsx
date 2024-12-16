import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useIntl } from "react-intl";

const AppNavigator = () => {
    const intl = useIntl();
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                        title: intl.formatMessage({
                            id: "tabs.dashboard.title",
                        }),
                    }}
                />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                    name="todos/add"
                    options={{
                        title: intl.formatMessage({
                            id: "addTodo.screen.header.title",
                        }),
                    }}
                />
                <Stack.Screen
                    name="todos/edit/[todoId]"
                    options={{
                        title: intl.formatMessage({
                            id: "editTodo.screen.header.title",
                        }),
                    }}
                />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
};

export { AppNavigator };
