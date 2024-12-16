import { LoginForm } from "@/components/forms/auth/login-form";
import { AddTodoForm } from "@/components/forms/todos/add-todo-form/add-todo-form";
import { TestIntegration } from "@/components/test-integration";
import { View } from "react-native";

export default function TestIntegrationScreen() {
    return (
        <View style={{ flex: 1 }}>
            <AddTodoForm />
            {/* <TestIntegration /> */}
        </View>
    );
}
